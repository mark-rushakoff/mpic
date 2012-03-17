require "stasis"
require "stasis/dev_mode"

task :default => [:development]

desc 'Start Stasis server in development mode on port 3000'
task :development do
  Stasis::DevMode.new('.', {:development => 3000})
end

desc 'Build to the default `public` directory once.'
task :build do
  Stasis.new('.').render
end
