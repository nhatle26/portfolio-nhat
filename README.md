# Portfolio — Le Minh Nhat

Trang portfolio tĩnh (HTML, CSS, JavaScript): theme sáng/tối, **VI/EN**, form liên hệ, tích hợp GitHub.

## Chạy local

Mở `index.html` trong trình duyệt hoặc dùng server tĩnh:

```bash
npx --yes serve .
```

## Đưa lên GitHub

1. Tạo repo mới trên GitHub (ví dụ `portfolio`), **không** tick “Add README” nếu bạn đã có file trong thư mục này.
2. Trong thư mục dự án:

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

3. **GitHub Pages** (tuỳ chọn): Settings → Pages → Branch `main`, folder `/ (root)` → site ở dạng `https://<username>.github.io/<repo>/`.

## Form gửi email

Form dùng [FormSubmit](https://formsubmit.co) (AJAX) tới `nhat.le27@students.passerellesnumeriques.org`. Lần gửi đầu có thể cần **xác nhận email** trong hộp thư (theo chính sách FormSubmit).

## Facebook

Liên kết profile: [facebook.com/LeMinhNhat26](https://web.facebook.com/LeMinhNhat26/).

## Ngôn ngữ dự án (GitHub)

Tỷ lệ % lấy từ API `.../repos/{owner}/{repo}/languages` (công khai, có giới hạn rate khi gọi nhiều lần).
