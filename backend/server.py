from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Locked Angle Supply Co.")
api_router = APIRouter(prefix="/api")


# ----------------------------- Models -----------------------------
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    price: float
    category: str
    description: str
    sizes: List[str] = []
    image_url: str
    featured: bool = False
    stock: int = 100
    tagline: Optional[str] = None


class OrderItem(BaseModel):
    product_id: str
    slug: str
    name: str
    price: float
    quantity: int
    size: Optional[str] = None
    image_url: Optional[str] = None


class OrderCreate(BaseModel):
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: Optional[str] = None
    postal_code: str
    country: str
    notes: Optional[str] = None


class Order(OrderCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    status: str = "received"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


class ContactMessage(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ----------------------------- Seed data -----------------------------
SEED_PRODUCTS: List[dict] = [
    {
        "slug": "sideways-heavyweight-tee",
        "name": "Sideways Heavyweight Tee",
        "price": 45.00,
        "category": "TEES",
        "description": "Heavyweight 280gsm cotton, boxy oversized cut. Screen-printed front graphic with a high-density blood red 'LOCKED ANGLE' wordmark on the back. Garment-dyed for that lived-in track day finish.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://static.prod-images.emergentagent.com/jobs/0450ab58-01ee-41cf-8117-a1dd4e85d11b/images/79713d231485340d82c42fb77b594f3470fbb6986c2e57fe18e9273ab81beb95.png",
        "featured": True,
        "tagline": "280gsm. Built to abuse.",
    },
    {
        "slug": "track-day-hoodie",
        "name": "Track Day Hoodie",
        "price": 85.00,
        "category": "HOODIES",
        "description": "500gsm brushed-back fleece. Heavy drawcords, ribbed cuffs, kangaroo pocket. Embroidered chest hit. Made for the cold morning paddock and the long drive home.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1680292783974-a9a336c10366?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGFwcGFyZWwlMjBwcm9kdWN0fGVufDB8fHx8MTc3OTcwMDY4M3ww&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "tagline": "500gsm. Cold paddock approved.",
    },
    {
        "slug": "smoke-steel-jacket",
        "name": "Smoke & Steel Jacket",
        "price": 120.00,
        "category": "OUTERWEAR",
        "description": "Water resistant coach jacket cut from heavy nylon-cotton. Snap front, deep hand pockets, oversized back graphic. Wind-blocking and smoke-resistant in spirit.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwyfHxibGFjayUyMGhvb2RpZSUyMGFwcGFyZWwlMjBwcm9kdWN0fGVufDB8fHx8MTc3OTcwMDY4M3ww&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "tagline": "Coach cut. Heavy nylon.",
    },
    {
        "slug": "lock-in-snapback",
        "name": "Lock-In Snapback",
        "price": 35.00,
        "category": "HEADWEAR",
        "description": "Structured 6-panel snapback in pitch black. Raised embroidery front, woven label on back. Flat brim. Locked angle, locked in.",
        "sizes": ["ONE SIZE"],
        "image_url": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "6-panel. Flat brim. Pure black.",
    },
    {
        "slug": "jdm-underground-tee",
        "name": "JDM Underground Tee",
        "price": 48.00,
        "category": "TEES",
        "description": "Mid-weight 220gsm tee with a katakana back print. Boxy fit, dropped shoulder. For the obsessives who can read it without the translation.",
        "sizes": ["S", "M", "L", "XL"],
        "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": True,
        "tagline": "220gsm. Katakana print.",
    },
    {
        "slug": "apex-drift-hoodie",
        "name": "Apex Drift Hoodie",
        "price": 90.00,
        "category": "HOODIES",
        "description": "Pullover hoodie with exhaust orange tonal stitch. Heavy panel construction across shoulders. Numbered batch tag inside the hem.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "Batch-numbered. Limited.",
    },
    {
        "slug": "burnout-beanie",
        "name": "Burnout Beanie",
        "price": 28.00,
        "category": "HEADWEAR",
        "description": "Heavy ribbed cuff beanie. Acrylic-wool blend. Woven label stitched on the cuff. Built for paddock mornings.",
        "sizes": ["ONE SIZE"],
        "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "Acrylic-wool. Heavy cuff.",
    },
    {
        "slug": "sideways-decal-pack",
        "name": "Sideways Decal Pack",
        "price": 12.00,
        "category": "ACCESSORIES",
        "description": "Pack of 5 die-cut vinyl decals. Weatherproof. Outdoor rated. For your bumper, your tool box, your laptop, your enemies' bumpers.",
        "sizes": ["ONE SIZE"],
        "image_url": "https://images.unsplash.com/photo-1601933470928-c6f4ed1e9385?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "Pack of 5. Weatherproof.",
    },
    {
        "slug": "tandem-long-sleeve",
        "name": "Tandem Long Sleeve",
        "price": 55.00,
        "category": "TEES",
        "description": "Heavy long sleeve tee. Sleeve hit reads 'TANDEM ONLY' down the forearm. Ribbed cuffs. Built for the late season.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "Sleeve hit. Heavy cotton.",
    },
    {
        "slug": "garage-bomber-jacket",
        "name": "Garage Bomber Jacket",
        "price": 145.00,
        "category": "OUTERWEAR",
        "description": "Quilted nylon bomber. Heavy YKK zip. Internal pocket for your phone, your keys, your trust issues. Numbered batch tag.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": True,
        "tagline": "Quilted nylon. YKK.",
    },
    {
        "slug": "locked-angle-crewneck",
        "name": "Locked Angle Crewneck",
        "price": 75.00,
        "category": "HOODIES",
        "description": "Classic heavyweight crewneck. Brushed inside. Tonal embroidered chest. No hood, no nonsense.",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "image_url": "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "Heavyweight. Tonal stitch.",
    },
    {
        "slug": "smoke-tour-cap",
        "name": "Smoke Tour Cap",
        "price": 32.00,
        "category": "HEADWEAR",
        "description": "Unstructured 5-panel cap. Brushed twill. Curved brim. Discreet rubber tab on side.",
        "sizes": ["ONE SIZE"],
        "image_url": "https://images.unsplash.com/photo-1521369909029-2afed882baee?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "featured": False,
        "tagline": "5-panel. Brushed twill.",
    },
]


async def seed_products():
    count = await db.products.count_documents({})
    if count == 0:
        docs = []
        for p in SEED_PRODUCTS:
            prod = Product(**p)
            docs.append(prod.model_dump())
        await db.products.insert_many(docs)
        logging.info(f"Seeded {len(docs)} products")


def _strip_id(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Locked Angle Supply Co. API"}


@api_router.get("/products", response_model=List[Product])
async def list_products(category: Optional[str] = None, featured: Optional[bool] = None):
    q: dict = {}
    if category and category.upper() != "ALL":
        q["category"] = category.upper()
    if featured is not None:
        q["featured"] = featured
    docs = await db.products.find(q, {"_id": 0}).to_list(500)
    return docs


@api_router.get("/products/featured", response_model=List[Product])
async def featured_products():
    docs = await db.products.find({"featured": True}, {"_id": 0}).to_list(50)
    return docs


@api_router.get("/categories", response_model=List[str])
async def list_categories():
    cats = await db.products.distinct("category")
    return sorted(cats)


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    doc = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return doc


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    order_number = "LA-" + uuid.uuid4().hex[:8].upper()
    order = Order(order_number=order_number, **payload.model_dump())
    await db.orders.insert_one(order.model_dump())
    return order


@api_router.get("/orders/{order_number}", response_model=Order)
async def get_order(order_number: str):
    doc = await db.orders.find_one({"order_number": order_number}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    return doc


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    await seed_products()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
