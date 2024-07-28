DELETE FROM Products;
DELETE FROM Categories;

INSERT INTO Categories (name, slug, icon)
VALUES ('Fruits', 'fruits', '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="anchor" class="svg-inline--fa fa-anchor w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M352 176C369.7 176 384 190.3 384 208C384 225.7 369.7 240 352 240H320V448H368C421 448 464 405 464 352V345.9L456.1 352.1C447.6 362.3 432.4 362.3 423 352.1C413.7 343.6 413.7 328.4 423 319L479 263C488.4 253.7 503.6 253.7 512.1 263L568.1 319C578.3 328.4 578.3 343.6 568.1 352.1C559.6 362.3 544.4 362.3 535 352.1L528 345.9V352C528 440.4 456.4 512 368 512H208C119.6 512 48 440.4 48 352V345.9L40.97 352.1C31.6 362.3 16.4 362.3 7.029 352.1C-2.343 343.6-2.343 328.4 7.029 319L63.03 263C72.4 253.7 87.6 253.7 96.97 263L152.1 319C162.3 328.4 162.3 343.6 152.1 352.1C143.6 362.3 128.4 362.3 119 352.1L112 345.9V352C112 405 154.1 448 208 448H256V240H224C206.3 240 192 225.7 192 208C192 190.3 206.3 176 224 176H234.9C209 158.8 192 129.4 192 96C192 42.98 234.1 0 288 0C341 0 384 42.98 384 96C384 129.4 366.1 158.8 341.1 176H352zM288 128C305.7 128 320 113.7 320 96C320 78.33 305.7 64 288 64C270.3 64 256 78.33 256 96C256 113.7 270.3 128 288 128z"></path></svg>'),
       ('Vegetables', 'vegetables', '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gamepad" class="svg-inline--fa fa-gamepad w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"></path></svg>'),
       ('Other Food', 'other-food', '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mobile-screen-button" class="svg-inline--fa fa-mobile-screen-button w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M304 0h-224c-35.35 0-64 28.65-64 64v384c0 35.35 28.65 64 64 64h224c35.35 0 64-28.65 64-64V64C368 28.65 339.3 0 304 0zM192 480c-17.75 0-32-14.25-32-32s14.25-32 32-32s32 14.25 32 32S209.8 480 192 480zM304 64v320h-224V64H304z"></path></svg>');

-- Get the category ID for Fruits
SELECT id FROM Categories WHERE slug = 'fruits';

-- Insert fruits
INSERT INTO Products (name, description, price, quantity_in_stock, category_id)
VALUES ('Apple', 'Fresh and juicy red apple', 1.99, 50, (SELECT id FROM Categories WHERE slug = 'fruits')),
       ('Banana', 'Sweet and creamy yellow banana', 0.79, 20, (SELECT id FROM Categories WHERE slug = 'fruits'));

-- Get the category ID for Vegetables
SELECT id FROM Categories WHERE slug = 'vegetables';

-- Insert vegetables
INSERT INTO Products (name, description, price, quantity_in_stock, category_id)
VALUES ('Tomato', 'Red and juicy tomato, perfect for salads', 1.29, 30, (SELECT id FROM Categories WHERE slug = 'vegetables')),
       ('Carrot', 'Orange and crunchy carrot, rich in Vitamin A', 0.59, 40, (SELECT id FROM Categories WHERE slug = 'vegetables'));

-- Get the category ID for Other Food
SELECT id FROM Categories WHERE slug = 'other-food';

-- Insert other food items
INSERT INTO Products (name, description, price, quantity_in_stock, category_id)
VALUES ('Bread', 'Freshly baked white bread', 2.49, 10, (SELECT id FROM Categories WHERE slug = 'other-food')),
       ('Cheese', 'Sharp cheddar cheese, perfect for sandwiches', 3.99, 15, (SELECT id FROM Categories WHERE slug = 'other-food'));