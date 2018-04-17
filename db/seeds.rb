require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# clean up the csv, map to shorter column names

path_product = "#{Rails.root}/products.csv"
text_product = File.read(path_product)
text_product.gsub!(/"\s*,\s*"/, '","')
CSV.parse(text_product, :headers => true).each do |row|
  data = row.to_hash
  data["id"] = data.delete("product_id")
  data["name"] = data.delete("product_name")
  data["image"] = data.delete("product_image")
  data["description"] = data.delete("product_description")
  Product.create!(data)
end

path_inventory = "#{Rails.root}/inventory.csv"
text_inventory = File.read(path_inventory)
text_inventory.gsub!(/\s*,\s*/, ',')
CSV.parse(text_inventory, :headers => true).each do |row|
  Inventory.create!(row.to_hash)
end
