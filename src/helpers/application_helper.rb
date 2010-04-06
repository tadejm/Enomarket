module ApplicationHelper
  
  def page_title
    full_page_title.join(" - ")
  end
  
  def full_page_title
    page_title = [@site_name ||= "Tenis Bar Lokvica"]
    page_title << @page_title
  end
  
  # def body_id
  #   @body_id
  # end
  
  def collect_photos
    @photos = []
  end
  
  def body_class
    class_names.join " "
  end
  
  def body_class_current_page
    current_page.gsub("/", "").gsub(".html", "")
  end
  
  def class_names
    Array(@body_class)
  end
  
end