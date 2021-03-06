class Role < ApplicationRecord

  include Concerns::SerializedAbilitiesFor

  ROLE_ADMIN = "admin".freeze
  ROLE_MARKETEER = "marketeer".freeze
  ROLE_EDITOR = "editor".freeze
  ROLE_PROJECT_CREATOR = "project_creator".freeze
  ROLE_PROJECT_EDITOR = "project_editor".freeze
  ROLE_PROJECT_RESOURCE_EDITOR = "project_resource_editor".freeze
  ROLE_PROJECT_AUTHOR = "project_author".freeze
  ROLE_READER = "reader".freeze

  GLOBAL_ROLES = [
    ROLE_ADMIN,
    ROLE_EDITOR,
    ROLE_MARKETEER,
    ROLE_PROJECT_CREATOR,
    ROLE_READER
  ].freeze

  SCOPED_ROLES = [
    ROLE_PROJECT_EDITOR,
    ROLE_PROJECT_RESOURCE_EDITOR,
    ROLE_PROJECT_AUTHOR
  ].freeze

  EDITOR_ROLES = [
    ROLE_EDITOR,
    ROLE_PROJECT_EDITOR,
    ROLE_PROJECT_AUTHOR
  ].freeze

  ALLOWED_ROLES = [
    GLOBAL_ROLES,
    SCOPED_ROLES
  ].flatten.freeze

  scopify

  belongs_to :resource,
             polymorphic: true,
             optional: true
  # rubocop:disable Rails/HasAndBelongsToMany
  has_and_belongs_to_many :users, join_table: "users_roles"
  # rubocop:enable Rails/HasAndBelongsToMany

  validates :resource_type,
            inclusion: { in: Rolify.resource_types },
            allow_nil: true
  validates :name, inclusion: { in: ALLOWED_ROLES }

end
