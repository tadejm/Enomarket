require 'compass'

Compass.add_project_configuration('config/compass.rb')
configuration.sass_options = Compass.sass_engine_options

configuration.haml_options = {
  :format => :html5,
  :attr_wrapper => '"'
}
