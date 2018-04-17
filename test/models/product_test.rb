require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test "find fuzzy" do
    Product.create(name: "washed chinos", image: "http", description: "blah")
    @results = Product.find_by_fuzzy_name("chimp")
    assert @results.size >= 1
  end
  # test "the truth" do
  #   assert true
  # end
end
