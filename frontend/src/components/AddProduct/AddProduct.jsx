import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import "./AddProduct.css"; // ⬅️ استایل جدا

const AddProduct = () => {
  const { addProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "t-shirt",
    price: "",
    image: "",
    image2: "",
    image3: "",
    sizing_image: "",
    description: "",
    full_description: "",
    tag: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "نام محصول الزامی است.";
    if (!form.category) return "دسته‌بندی را انتخاب کنید.";
    if (form.price === "" || isNaN(Number(form.price))) return "قیمت نامعتبر است.";
    if (!form.image.trim()) return "آدرس تصویر اصلی الزامی است.";
    return "";
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }

    try {
      setSaving(true);
      setError("");
      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price) || 0,
        image: form.image.trim(),
        image2: form.image2.trim() || undefined,
        image3: form.image3.trim() || undefined,
        sizing_image: form.sizing_image.trim() || undefined,
        description: form.description.trim() || "",
        full_description: form.full_description.trim() || "",
        tag: form.tag.trim() || undefined,
      };
      const created = await addProduct(payload);
      alert("✅ محصول با موفقیت اضافه شد.");
      if (created?.id) navigate(`/product/${created.id}`);
      // یا: navigate("/product-manager");
    } catch (err) {
      setError(err?.message || "خطا در افزودن محصول");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <h2>افزودن محصول جدید</h2>
        <Link to="/product-manager" className="back-link">بازگشت به مدیریت محصولات</Link>
      </div>

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="field">
          <label>نام محصول *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            type="text"
            placeholder="مثلاً: تی‌شرت مردانه مدل ..."
            required
          />
        </div>

        <div className="field">
          <label>دسته‌بندی *</label>
          <select name="category" value={form.category} onChange={onChange}>
            <option value="t-shirt">تیشرت</option>
            <option value="shirt">پیراهن</option>
            <option value="pants">شلوار</option>
          </select>
        </div>

        <div className="field">
          <label>قیمت (تومان) *</label>
          <input
            name="price"
            value={form.price}
            onChange={onChange}
            type="number"
            min="0"
            placeholder="مثلاً: 499000"
            required
          />
        </div>

        <div className="field">
          <label>آدرس تصویر اصلی *</label>
          <input
            name="image"
            value={form.image}
            onChange={onChange}
            type="url"
            placeholder="http://localhost:3001/images/....webp"
            required
          />
          {form.image?.trim() && (
            <div className="preview">
              <img src={form.image} alt="preview-1" />
            </div>
          )}
        </div>

        <div className="field">
          <label>آدرس تصویر ۲ (اختیاری)</label>
          <input
            name="image2"
            value={form.image2}
            onChange={onChange}
            type="url"
            placeholder="http://localhost:3001/images/....webp"
          />
          {form.image2?.trim() && (
            <div className="preview">
              <img src={form.image2} alt="preview-2" />
            </div>
          )}
        </div>

        <div className="field">
          <label>آدرس تصویر ۳ (اختیاری)</label>
          <input
            name="image3"
            value={form.image3}
            onChange={onChange}
            type="url"
            placeholder="http://localhost:3001/images/....webp"
          />
          {form.image3?.trim() && (
            <div className="preview">
              <img src={form.image3} alt="preview-3" />
            </div>
          )}
        </div>

        <div className="field">
          <label>آدرس تصویر سایزبندی (اختیاری)</label>
          <input
            name="sizing_image"
            value={form.sizing_image}
            onChange={onChange}
            type="url"
            placeholder="http://localhost:3001/images/t-shirt-sizing.webp"
          />
          {form.sizing_image?.trim() && (
            <div className="preview">
              <img src={form.sizing_image} alt="preview-sizing" />
            </div>
          )}
        </div>

        <div className="field">
          <label>توضیحات کوتاه</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={3}
            placeholder="توضیحات کوتاه محصول..."
          />
        </div>

        <div className="field">
          <label>توضیحات تکمیلی</label>
          <textarea
            name="full_description"
            value={form.full_description}
            onChange={onChange}
            rows={5}
            placeholder="توضیحات بلند/تکمیلی محصول..."
          />
        </div>

        <div className="field">
          <label>تگ (اختیاری)</label>
          <input
            name="tag"
            value={form.tag}
            onChange={onChange}
            type="text"
            placeholder="مثلاً: new"
          />
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "در حال ثبت..." : "ثبت محصول"}
          </button>
          <button type="button" className="btn" onClick={() => navigate(-1)} disabled={saving}>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
