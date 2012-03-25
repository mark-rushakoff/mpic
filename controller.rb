require 'haml'
require 'sass'
require 'coderay'
require 'redcarpet'

class Button
  attr_reader :file_name, :html, :func_name, :camel_name
  def initialize(func_name)
    @func_name = func_name
    @camel_name = func_name.gsub(/(.)([A-Z])/,'\1_\2').downcase
    @file_name = "js/#{@camel_name}.js"
    @html = CodeRay.encode_file @file_name, :div
  end
end

ignore *%w{.gitignore LICENSE Gemfile Gemfile.lock Rakefile}
ignore(/\.swp$/, %r{/\.git/}, %r{/\.sass-cache/})

before 'index.html.haml' do
  @buttons = %w{
      Buttoner
      HidingButtoner
      CallbackLeakButtoner
    }.map { |func_name| Button.new func_name }
end
