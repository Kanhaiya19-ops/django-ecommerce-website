from django.core.management.base import BaseCommand
from store.models import Product

PRODUCTS = [
    ("Minimal Backpack", "Lightweight everyday backpack with laptop sleeve.", 1499, "Bags", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"),
    ("Classic Sneakers", "Clean everyday sneakers designed for comfort.", 2499, "Footwear", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"),
    ("Smart Watch", "Fitness tracking, notifications and a bright display.", 3999, "Electronics", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"),
    ("Wireless Headphones", "Over-ear headphones with immersive sound.", 3299, "Electronics", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"),
    ("Ceramic Mug", "Simple ceramic mug for coffee, tea and more.", 499, "Home", "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=700"),
    ("Classic Sunglasses", "Timeless frame with UV-protective lenses.", 999, "Accessories", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700"),
]

class Command(BaseCommand):
    help = "Create demo products"

    def handle(self, *args, **kwargs):
        for name, desc, price, category, image in PRODUCTS:
            Product.objects.update_or_create(
                name=name,
                defaults={
                    "description": desc, "price": price, "category": category,
                    "image_url": image, "stock": 20
                },
            )
        self.stdout.write(self.style.SUCCESS("Demo products created."))
