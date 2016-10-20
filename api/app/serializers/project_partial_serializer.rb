# Provides a partial serialization of a project model.
class ProjectPartialSerializer < ActiveModel::Serializer
  cache key: "project_partial", expires_in: 3.hours
  attributes :id, :title, :subtitle, :hashtag, :publication_year, :publication_month,
             :publication_day_of_month, :description, :avatar_url, :cover_url,
             :hero_url, :created_at, :updated_at, :featured, :purchase_url,
             :purchase_price_money, :purchase_price_currency, :purchase_version_label,
             :twitter_id, :instagram_id, :facebook_id

  has_many :creators, serializer: MakerSerializer
  has_many :contributors, serializer: MakerSerializer
end
