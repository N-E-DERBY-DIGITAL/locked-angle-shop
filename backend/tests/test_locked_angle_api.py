"""Backend API tests for Locked Angle Supply Co."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://locked-angle-shop.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Products ----------
class TestProducts:
    def test_list_returns_12(self, client):
        r = client.get(f"{API}/products", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 12
        # spot-check fields
        p = data[0]
        for k in ["id", "slug", "name", "price", "category", "image_url"]:
            assert k in p

    def test_filter_by_category_tees(self, client):
        r = client.get(f"{API}/products", params={"category": "TEES"}, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        assert all(p["category"] == "TEES" for p in data)

    def test_filter_category_all_returns_all(self, client):
        r = client.get(f"{API}/products", params={"category": "ALL"}, timeout=30)
        assert r.status_code == 200
        assert len(r.json()) == 12

    def test_featured_endpoint(self, client):
        r = client.get(f"{API}/products/featured", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 1
        assert all(p["featured"] is True for p in data)

    def test_categories_sorted(self, client):
        r = client.get(f"{API}/categories", timeout=30)
        assert r.status_code == 200
        cats = r.json()
        assert isinstance(cats, list)
        assert cats == sorted(cats)
        # Expected categories from seed
        for expected in ["TEES", "HOODIES", "OUTERWEAR", "HEADWEAR", "ACCESSORIES"]:
            assert expected in cats

    def test_get_product_by_slug(self, client):
        r = client.get(f"{API}/products/sideways-heavyweight-tee", timeout=30)
        assert r.status_code == 200
        p = r.json()
        assert p["slug"] == "sideways-heavyweight-tee"
        assert p["name"] == "Sideways Heavyweight Tee"
        assert p["price"] == 45.00

    def test_get_unknown_slug_returns_404(self, client):
        r = client.get(f"{API}/products/locked-angle-shop", timeout=30)
        # 'locked-angle-shop' is not a seeded slug -> should be 404
        assert r.status_code == 404


# ---------- Orders ----------
class TestOrders:
    def _valid_payload(self):
        return {
            "items": [
                {
                    "product_id": "p1",
                    "slug": "sideways-heavyweight-tee",
                    "name": "Sideways Heavyweight Tee",
                    "price": 45.00,
                    "quantity": 2,
                    "size": "L",
                    "image_url": "https://example.com/img.png",
                }
            ],
            "subtotal": 90.00,
            "shipping": 10.00,
            "total": 100.00,
            "full_name": "TEST Buyer",
            "email": "test_buyer@example.com",
            "phone": "5551234",
            "address_line1": "1 Apex Way",
            "address_line2": "",
            "city": "Tokyo",
            "state": "",
            "postal_code": "100-0001",
            "country": "JP",
            "notes": "TEST order",
        }

    def test_create_order_and_retrieve(self, client):
        r = client.post(f"{API}/orders", json=self._valid_payload(), timeout=30)
        assert r.status_code == 200, r.text
        o = r.json()
        assert o["order_number"].startswith("LA-")
        assert len(o["order_number"]) == 11  # LA- + 8 chars
        assert o["status"] == "received"
        assert o["total"] == 100.00

        # GET to verify persistence
        g = client.get(f"{API}/orders/{o['order_number']}", timeout=30)
        assert g.status_code == 200
        fetched = g.json()
        assert fetched["order_number"] == o["order_number"]
        assert fetched["email"] == "test_buyer@example.com"
        assert len(fetched["items"]) == 1

    def test_empty_cart_rejected(self, client):
        payload = self._valid_payload()
        payload["items"] = []
        r = client.post(f"{API}/orders", json=payload, timeout=30)
        assert r.status_code == 400

    def test_invalid_email_rejected(self, client):
        payload = self._valid_payload()
        payload["email"] = "not-an-email"
        r = client.post(f"{API}/orders", json=payload, timeout=30)
        assert r.status_code == 422

    def test_missing_required_field_rejected(self, client):
        payload = self._valid_payload()
        del payload["address_line1"]
        r = client.post(f"{API}/orders", json=payload, timeout=30)
        assert r.status_code == 422

    def test_get_unknown_order_404(self, client):
        r = client.get(f"{API}/orders/LA-DEADBEEF", timeout=30)
        assert r.status_code == 404


# ---------- Contact ----------
class TestContact:
    def test_create_contact(self, client):
        payload = {
            "name": "TEST Contact",
            "email": "test_contact@example.com",
            "subject": "Inquiry",
            "message": "Built for the sideways.",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == "TEST Contact"
        assert d["email"] == "test_contact@example.com"
        assert "id" in d
        assert "created_at" in d

    def test_invalid_email_contact(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "x", "email": "bad", "message": "hi"
        }, timeout=30)
        assert r.status_code == 422

    def test_missing_message_contact(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "x", "email": "ok@example.com"
        }, timeout=30)
        assert r.status_code == 422
