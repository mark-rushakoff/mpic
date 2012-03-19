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

desc 'Build the gh-pages branch'
task :'build-gh' do
  require 'grit'
  require 'pathname'
  Stasis.new('.').render
  Dir.chdir(File.dirname(__FILE__))
  r = Grit::Repo.new('.', :is_bare => true)
  i = r.index
  root = Pathname.new('public')
  Dir.glob('public/**/*').each do |path|
    actual_path = Pathname.new path
    next if File.directory? actual_path
    commit_path = actual_path.relative_path_from(root)
    i.add(commit_path.to_s, File.open(actual_path, 'rb').read)
  end
  message = "Automatic build of gh-pages branch\n\n(#{Time.now.strftime '%F %T %z'})"
  i.commit(message, [r.get_head('gh-pages').commit], nil, nil, 'gh-pages')
  puts "Committed to gh-pages: #{r.get_head('gh-pages').commit.sha}"
end
