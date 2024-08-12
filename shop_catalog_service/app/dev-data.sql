DELETE FROM Products;
DELETE FROM Categories;

INSERT INTO Categories (id, name, slug, icon)
VALUES (1, 'Fruits', 'fruits', 'icon-spades'),
       (2, 'Vegetables', 'vegetables', 'icon-clubs'),
       (3, 'Other Food', 'other-food', 'icon-diamonds');

-- Get the category ID for Fruits
SELECT id FROM Categories WHERE slug = 'fruits';

-- Insert fruits
INSERT INTO Products (id, name, description, price, quantity_in_stock, category_id, created_at)
VALUES ('c8528789-e836-42c5-bcaa-72d92a536274', 'Apple', 'Fresh and juicy red apple', 1.99, 50, (SELECT id FROM Categories WHERE slug = 'fruits'), NOW()),
       ('28528789-e836-42c5-bcaa-72d92a536274', 'Strawberry', 'Fresh and juicy red strawberry', 3.99, 500, (SELECT id FROM Categories WHERE slug = 'fruits'), NOW()),
       ('13528789-e836-42c5-bcaa-72d92a536274', 'Peach', 'Fresh and juicy orange peach', 1.00, 100, (SELECT id FROM Categories WHERE slug = 'fruits'), NOW()),
       ('c8528789-e836-42c5-bcaa-72d92a536275', 'Banana', 'Sweet and creamy yellow banana', 0.79, 20, (SELECT id FROM Categories WHERE slug = 'fruits'), NOW());

-- Get the category ID for Vegetables
SELECT id FROM Categories WHERE slug = 'vegetables';

-- Insert vegetables
INSERT INTO Products (id, name, description, price, quantity_in_stock, category_id, created_at)
VALUES ('c8528789-e836-42c5-bcaa-72d92a536276', 'Tomato', 'Red and juicy tomato, perfect for salads', 1.29, 30, (SELECT id FROM Categories WHERE slug = 'vegetables'), NOW()),
       ('18528789-e836-42c5-bcaa-72d92a536276', 'Cabbage', 'Green and juicy cabbage', 1.99, 10, (SELECT id FROM Categories WHERE slug = 'vegetables'), NOW()),
       ('12528789-e836-42c5-bcaa-72d92a536276', 'Radish', 'Red and juicy radish', 0.99, 33, (SELECT id FROM Categories WHERE slug = 'vegetables'), NOW()),
       ('c8528789-e836-42c5-bcaa-72d92a536277', 'Carrot', 'Orange and crunchy carrot, rich in Vitamin A', 0.59, 40, (SELECT id FROM Categories WHERE slug = 'vegetables'), NOW());

-- Get the category ID for Other Food
SELECT id FROM Categories WHERE slug = 'other-food';

-- Insert other food items
INSERT INTO Products (id, name, description, price, quantity_in_stock, category_id, created_at)
VALUES ('c8528789-e836-42c5-bcaa-72d92a536278', 'Bread', 'Freshly baked white bread', 2.49, 10, (SELECT id FROM Categories WHERE slug = 'other-food'), NOW()),
       ('c8528789-e836-42c5-bcaa-72d92a536288', 'Milk', 'Fresh milk from cow', 3.49, 20, (SELECT id FROM Categories WHERE slug = 'other-food'), NOW()),
       ('11528789-e836-42c5-bcaa-72d92a536288', 'Butter', 'Fresh butter from cow', 2.29, 10, (SELECT id FROM Categories WHERE slug = 'other-food'), NOW()),
       ('c8528789-e836-42c5-bcaa-72d92a536279', 'Cheese', 'Sharp cheddar cheese, perfect for sandwiches', 3.99, 15, (SELECT id FROM Categories WHERE slug = 'other-food'), NOW());