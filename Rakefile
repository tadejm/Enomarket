ftp_user = "kicdej01@ftp.enomarket.si" # for rsync deployment
remote_root = "~/path/to/remote/" # for rsync deployment

desc "Runs preview"
task :preview do
  system "staticmatic preview ."
end

desc "Builds the site"
task :build => 'styles:clear' do
  puts "*** Building the site ***"
  system "staticmatic build ."
end

desc "Delete generated html"
task :clear => 'styles:clear' do
  puts "*** Clearing the views ***"
  system "rm -fv site/*html"
  system "rm -fv site/it/*html"
end

desc "Clears and generates new styles, builds and deploys"
task :deploy => :build do
  puts "*** Deploying the site ***"
  system("rsync -avz --delete site/ #{ssh_user}:#{remote_root}")
end

namespace :styles do
  desc "Clears the styles"
  task :clear do
    puts "*** Clearing styles ***"
    system "rm -Rfv site/stylesheets/*"
  end
  
  desc "Generates new styles"
  task :generate => :clear do
    puts "*** Generating styles ***"
    system "compass"
  end
end