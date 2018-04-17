class Product < ApplicationRecord
  has_many :inventories
  fuzzily_searchable :name
end
