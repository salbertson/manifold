module Manifold
  module SearchTask
    def self.types
      %w(Collection Event Maker Project Resource User)
    end
  end
end

namespace :manifold do
  namespace :search do
    desc "Reindex searchable models."
    task reindex: :environment do
      Manifold::SearchTask.types.each do |class_name|
        Rake::Task["manifold:search:reindex:#{class_name.downcase}"].invoke
      end
    end

    namespace :reindex do
      Manifold::SearchTask.types.each do |class_name|
        desc "Reindex #{class_name.downcase} models."
        task class_name.downcase.to_sym => :environment do
          ENV["CLASS"] = class_name
          Manifold::Rake.logger.info "Reindexing #{ENV['CLASS'].downcase} models."
          Rake::Task["searchkick:reindex"].invoke
        end
      end
    end
  end
end
