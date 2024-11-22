class FurnitureItem:

    def __init__(
        self, item_id, name, category, price, old_price, sellable_online, link, other_colors, short_description, 
        designer, depth, height, width, living_room, bedroom, office, kitchen, dining_room, entrance, 
        playroom, nursery, outdoor, space, size_cluster, size_category, cluster, rooms, image_path=""):        
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
        self.living_room = living_room
        self.bedroom = bedroom
        self.office = office
        self.kitchen = kitchen
        self.dining = dining_room
        self.entrance = entrance
        self.playroom = playroom
        self.nursery = nursery
        self.outdoor = outdoor
        self.space = space
        self.size_cluster = size_cluster
        self.size_category = size_category
        self.cluster = cluster
        self.rooms = rooms
        self.image_path = image_path

    def __repr__(self):
        return f"<FurnitureItem {self.name} ({self.item_id})>"

