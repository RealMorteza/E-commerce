import React from 'react'
import './Newsletter.css'

export const Newsletter = () => {
    return (
        <div class="newsletter">
            <h1>دریافت پیشنهادهای ویژه در ایمیل شما</h1>
            <p>برای دریافت خبرنامه و اطلاع از جدیدترین پیشنهادات ثبت‌نام کنید</p>
            <div class="form-container">
                <input type="email" placeholder="ایمیل خود را وارد کنید"/>
                    <button>عضویت</button>
            </div>
        </div>
    )
}
export default Newsletter;
