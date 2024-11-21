class FurnitureItem:

    def __init__(self, item_id, name, category, price, old_price, sellable_online, link, other_colors, short_description, designer, depth, height, width):
        self.item_id = item_id
        self.name = name
        self.category = category
        self.price = price
        self.old_price = old_price
        self.sellable_online = sellable_online
        self.link = link
        self.other_colors = other_colors
        self.short_description = short_description
        self.designer = designer
        self.depth = depth
        self.height = height
        self.width = width

    def __repr__(self):
        return f"<FurnitureItem {self.name} ({self.item_id})>"

