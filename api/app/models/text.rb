require "memoist"

# A single Text
class Text < ApplicationRecord

  TYPEAHEAD_ATTRIBUTES = [:title, :makers].freeze

  # Authorization
  include Authority::Abilities
  include Concerns::SerializedAbilitiesFor
  include Concerns::ValidatesSlugPresence

  # Default Scope
  default_scope { order(position: :asc).includes(:titles, :text_subjects, :category) }

  # Concerns
  extend Memoist
  include Collaborative
  include Citable
  include TrackedCreator
  include Metadata
  extend FriendlyId
  include Attachments

  # Magic
  with_metadata %w(
    series_title container_title isbn issn doi unique_identifier language
    original_publisher original_publisher_place original_title publisher publisher_place
    version series_number edition issue volume rights rights_territory restrictions
    rights_holder
  )

  with_citation do |text|
    text_authors = text.creator_names_array
    author = text_authors.empty? ? text.project_creator_names_array : text_authors
    issued = text.publication_date || text.project_publication_date
    {
      title: text.title,
      author: author,
      issued: issued
    }
  end
  with_citable_children :text_sections

  # URLs
  friendly_id :title, use: :slugged

  # Fields
  serialize :structure_titles, Hash
  serialize :toc, Array
  serialize :page_list, Array
  serialize :landmarks, Array

  # Acts as List
  acts_as_list scope: [:project_id, :category_id]

  # Associations
  belongs_to :project, optional: true, touch: true
  belongs_to :category, optional: true
  has_one :publishing_project, class_name: "Project", foreign_key: "published_text_id",
          dependent: :nullify, inverse_of: :published_text
  belongs_to :start_text_section, optional: true, class_name: "TextSection",
             inverse_of: :text_started_by
  has_many :ingestions, dependent: :nullify, inverse_of: :text
  has_many :titles, class_name: "TextTitle", dependent: :destroy, inverse_of: :text
  has_many :text_subjects, dependent: :destroy
  has_many :subjects, through: :text_subjects
  has_many :ingestion_sources, dependent: :destroy
  has_many :text_sections, -> { order(position: :asc) }, dependent: :destroy,
           inverse_of: :text
  has_many :stylesheets, -> { order(position: :asc) }, dependent: :destroy,
           inverse_of: :text
  has_many :favorites, as: :favoritable, dependent: :destroy, inverse_of: :favoritable
  has_many :annotations, through: :text_sections
  has_one :text_created_event, -> { where event_type: EventType[:text_added] },
          class_name: Event, as: :subject, dependent: :destroy, inverse_of: :subject

  # Delegations
  delegate :creator_names_array, to: :project, prefix: true, allow_nil: true
  delegate :publication_date, to: :project, prefix: true, allow_nil: true
  delegate :title, to: :category, prefix: true
  delegate :title_formatted, to: :main_title, allow_nil: true
  delegate :title_plaintext, to: :main_title, allow_nil: true

  # Validation
  validates :spine,
            presence: true, unless: proc { |x| x.spine.is_a?(Array) && x.spine.empty? }

  # Attachments
  manifold_has_attached_file :cover, :image, no_styles: true

  # Callbacks
  after_commit :trigger_text_added_event, on: [:create, :update]

  # Search
  searchkick(word_start: TYPEAHEAD_ATTRIBUTES,
             callbacks: :async,
             batch_size: 500,
             highlight: [:title, :body])

  scope :search_import, lambda {
    includes(
      :makers,
      :project,
      :category,
      :titles
    )
  }

  # During ingestion, texts can be created before they're added to a project.
  # We don't want to index those orphaned texts.
  def should_index?
    project.present?
  end

  def search_data
    {
      title: title,
      body: description,
      project_id: project.id,
      title_values: titles.map(&:value),
      project_title: project.title,
      makers: makers.map(&:name)
    }.merge(search_hidden)
  end

  def search_hidden
    project.present? ? project.search_hidden : { hidden: true }
  end

  def main_title
    if association(:titles).loaded?
      titles.detect { |t| t.kind == TextTitle::KIND_MAIN }
    else
      titles.find_by(kind: TextTitle::KIND_MAIN)
    end
  end

  def title
    return "untitled" unless main_title
    main_title.value
  end

  def title=(value)
    title = titles.find_or_initialize_by(kind: TextTitle::KIND_MAIN)
    title.value = value
    title.save
  end

  def section_before(position)
    # text_sections.where("position > ?", position)
  end

  def section_after(position); end

  def section_at(position)
    text_sections.find_by(position: position)
  end

  def find_text_section_by_source_path(path)
    source = ingestion_sources.find_by(source_path: path)
    return unless source
    source_id = source.source_identifier
    text_sections.find_by(source_identifier: source_id)
  end

  def section_source_map
    map = {}
    text_sections.each do |ts|
      next if ts.ingestion_source.nil?
      path = ts.ingestion_source.source_path
      map[path] = ts
    end
    map
  end
  memoize :section_source_map

  def source_path_map
    map = {}
    ingestion_sources.each do |s|
      map[s.source_path] = s.attachment_url
    end
    map
  end
  memoize :source_path_map

  def toc_section
    text_sections.find_by(kind: TextSection::KIND_NAVIGATION)
  end

  def published?
    project && project.published_text == self
  end

  def to_s
    title
  end

  private

  def category_list_scope
    category_id || 0
  end

  def trigger_text_added_event
    Event.trigger(EventType[:text_added], self) if project
  end

  def annotations_count
    annotations.only_annotations.count
  end

  def highlights_count
    annotations.only_highlights.count
  end
end
