require 'haml'
require 'coderay'

class Button
  attr_reader :file_name, :html, :func_name, :camel_name
  def initialize(func_name)
    @func_name = func_name
    @camel_name = func_name.gsub(/(.)([A-Z])/,'\1_\2').downcase
    @file_name = "js/#{@camel_name}.js"
    @html = CodeRay.encode_file @file_name, :div
  end
end

before 'index.html.haml' do
  @buttons = %w{Buttoner BadButtoner}.map do |func_name|
    Button.new func_name
  end
end
