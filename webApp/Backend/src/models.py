class FurnitureItem:

    def __init__(
        self, item_id, name, category, price, old_price, sellable_online, link, other_colors, short_description, 
        designer, depth, height, width, living_room, bedroom, office, kitchen, dining_room, entrance, 
        playroom, nursery, outdoor, space, size_cluster, size_category, cluster, rooms, image_path="http://127.0.0.1:5000/data/pictures/furniture_1.jpg"):        
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
    
class FilterItem:

    def __init__(self, price_min=1, price_max=9585, height_min=1, height_max=321, 
                 width_min=1, width_max=420, depth_min=1, depth_max=257, 
                 living_room=1, bedroom=1, office=1, kitchen=1, dining=1, 
                 entrance=1, playroom=1, nursery=1, outdoor=1):
        
        self.price_min = price_min
        self.price_max = price_max
        self.height_min = height_min
        self.height_max = height_max
        self.width_min = width_min
        self.width_max = width_max
        self.depth_min = depth_min
        self.depth_max = depth_max
        self.living_room = living_room
        self.bedroom = bedroom
        self.office = office
        self.kitchen = kitchen
        self.dining = dining
        self.entrance = entrance
        self.playroom = playroom
        self.nursery = nursery
        self.outdoor = outdoor

