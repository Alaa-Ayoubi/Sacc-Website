# قاعدة البيانات: محليًا على جهازك ثم على Neon

هذا الدليل يجهّز قاعدة بيانات PostgreSQL على حاسوبك، تملؤها وتراجع محتواها
من لوحة التحكم، ثم تنقلها كما هي إلى مشروع جديد على [Neon](https://neon.tech)
يتصل به الخادم المنشور على Render.

الأوامر مكتوبة لـ **PowerShell على Windows**. على macOS أو Linux هي نفسها،
باستثناء ما هو مذكور بجانبه.

---

## ما تحتاجينه مرة واحدة

- **Docker Desktop**: لتشغيل PostgreSQL دون تثبيته على الجهاز.
- **Python 3.12**.
- **Git**، ونسخة من المستودع على جهازك.

---

## الجزء الأول: قاعدة بيانات محلية على جهازك

### 1. شغّلي PostgreSQL

```powershell
cd backend
docker compose up -d
```

يشغّل هذا PostgreSQL 16 على المنفذ `5433`. البيانات محفوظة في مجلد Docker
اسمه `sacc_pgdata`، فلا تضيع عند إطفاء الجهاز. لإيقافه: `docker compose stop`.

### 2. ملف الإعدادات

انسخي `.env.example` إلى ملف جديد اسمه `.env` داخل `backend`، وعدّلي فيه ثلاث
قيم:

- **DEBUG**: اجعليها `True`.
- **SECRET_KEY**: أي نص طويل عشوائي من اختيارك.
- **DATABASE_URL**: العنوان المكتوب في أول ملف `docker-compose.yml`، وهو عنوان
  قاعدة Docker المحلية.

ملف `.env` لا يُرفع إلى GitHub أبدًا، فالمستودع يتجاهله تلقائيًا.

### 3. بيئة Python والجداول والمحتوى

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python manage.py migrate
.venv\Scripts\python manage.py seed_content
.venv\Scripts\python manage.py createsuperuser
```

على macOS أو Linux استبدلي `.venv\Scripts\python` بـ `.venv/bin/python`.

- `seed_content` يملأ المحتوى الحقيقي باللغتين: الخدمات والمشاريع والقيادة،
  وساعات العمل الصحيحة (السبت – الخميس، والجمعة مغلق).
- `createsuperuser` يُنشئ حساب المدير. احفظي اسمه وكلمة مروره، فهو نفسه
  الحساب الذي ستدخلين به على الخادم المنشور بعد النقل.

### 4. شغّلي الخادم وراجعي المحتوى

```powershell
.venv\Scripts\python manage.py runserver
```

- لوحة التحكم: http://localhost:8000/admin
- فحص الاتصال بالقاعدة: http://localhost:8000/api/v1/health/
  يجب أن يظهر `"database":"ok"`.

لرؤية الموقع نفسه متصلًا بهذه القاعدة، افتحي نافذة ثانية:

```powershell
cd frontend
npm install
npm run dev
```

ثم افتحي http://localhost:5173

---

## الجزء الثاني: النقل إلى Neon

### 1. أنشئي مشروعًا جديدًا على Neon

عند الإنشاء في neon.tech اختاري:

- **Postgres version: 16**، الإصدار نفسه الذي على جهازك.
- **Region: AWS US West (Oregon)**، وهي منطقة خادم Render نفسها، فيكون
  الاتصال أسرع.

ثم من صفحة المشروع انسخي **Connection string** بهذه الشروط:

- اختاري الاتصال **المباشر**، أي غير المفعّل عليه **Connection pooling**،
  فيكون العنوان بدون كلمة `-pooler`.
- يجب أن ينتهي الرابط بـ `?sslmode=require`، وانسخيه كما هو دون تعديل.

لا تلصقي هذا الرابط في أي محادثة أو ملف داخل المستودع، فهو يحتوي كلمة
المرور.

### 2. انسخي القاعدة المحلية إلى Neon

من داخل مجلد `backend`، والقاعدة المحلية تعمل:

```powershell
docker compose exec db pg_dump -U sacc -Fc -f /tmp/sacc.dump sacc
docker compose exec db pg_restore --no-owner --no-acl -d "ضعي-هنا-رابط-Neon" /tmp/sacc.dump
```

- الأمر الأول يأخذ نسخة كاملة من قاعدتك المحلية: الجداول والمحتوى وحساب
  المدير.
- الأمر الثاني يكتبها في Neon.

يعمل الأمران داخل حاوية Docker، فلا حاجة لتثبيت أدوات PostgreSQL على جهازك.
ضعي رابط Neon بين علامتي التنصيص `" "`.

### 3. اربطي الخادم المنشور بالقاعدة الجديدة

1. في لوحة Render افتحي خدمة **sacc-backend** ثم **Environment**.
2. ضعي رابط Neon في **DATABASE_URL** ثم **Save Changes**.
3. من صفحة الخدمة اختاري **Manual Deploy** ثم **Deploy latest commit**.

أثناء النشر يتحقق الخادم من الجداول، ويرى أن المحتوى موجود فلا يكتب فوقه.

### 4. تحققي

- افتحي `https://sacc-backend-894t.onrender.com/api/v1/health/`: يجب أن يظهر
  `"database":"ok"`. الخدمة المجانية تنام عند عدم الاستخدام، فقد تستغرق أول
  مرة دقيقة.
- ادخلي `/admin` على الخادم نفسه بحساب المدير الذي أنشأتِه محليًا.
- أرسلي طلبًا تجريبيًا من نموذج «اطلب عرض سعر» في الموقع، وتأكدي أنه ظهر في
  لوحة التحكم.

---

## رابطا Neon: المجمَّع والمباشر

يعطي Neon رابطين للقاعدة نفسها، ويكتبهما الأمر `neon env pull` (أو
`neon deploy`) في ملف `.env.local` في جذر المشروع:

- **`DATABASE_URL`**: الرابط المجمَّع (pooled)، وعنوانه ينتهي بـ `-pooler`. هو
  لاستخدام الموقع العادي.
- **`DATABASE_URL_UNPOOLED`**: الرابط المباشر. هو لترحيل الجداول، والنسخ
  الاحتياطي واستعادته، وتشغيل الاختبارات.

الخادم مهيأ للتعامل مع الرابطين:
- يقرأ `.env.local` تلقائيًا عند التشغيل على جهازك.
- يتعرّف على الرابط المجمَّع من كلمة `-pooler` في عنوانه، فيضبط إعداداته له
  تلقائيًا.
- ملف البناء على Render (`build.sh`) يرحّل الجداول عبر الرابط المباشر متى
  وُجد.

لذلك ضعي في لوحة Render **المتغيّرين معًا**: `DATABASE_URL` و
`DATABASE_URL_UNPOOLED`.

لتشغيل الترحيل أو الاختبارات على جهازك مقابل Neon، فعّلي الرابط المباشر بهذا
الإعداد:

```powershell
$env:DB_USE_DIRECT="True"; .venv\Scripts\python manage.py migrate
```

(على macOS أو Linux: `DB_USE_DIRECT=True .venv/bin/python manage.py migrate`)

ولنسخ قاعدتك المحلية إلى Neon بأمر `pg_restore` في الجزء الثاني، استخدمي
**الرابط المباشر** أيضًا.

---

## نسخة احتياطية دورية (مهم)

القاعدة السابقة اختفت دون نسخة. خذي نسخة من Neon مرة شهريًا على الأقل،
وبعد أي تعديل كبير في المحتوى:

```powershell
docker compose exec db pg_dump -Fc -f /tmp/backup.dump "رابط-Neon"
docker compose cp db:/tmp/backup.dump ./sacc-backup.dump
```

احفظي الملف `sacc-backup.dump` خارج المستودع، في مكان آمن، لأنه يحتوي بيانات
الطلبات وحساب المدير. المستودع يتجاهل ملفات `.dump` حتى لا تُرفع بالخطأ.

لاستعادة نسخة إلى قاعدة فارغة، استخدمي أمر `pg_restore` نفسه في الجزء الثاني.

---

## بعد تعديل المحتوى من لوحة التحكم

لكي يظهر التعديل في صفحات الموقع:

```powershell
.venv\Scripts\python manage.py export_site_data --frontend
```

ثم ارفعي الملف الذي تغيّر (`frontend/src/data/site-content.json`) إلى GitHub،
فيُنشر مع النشر التالي. التفاصيل في `README.md`.

عند تشغيل هذا الأمر على جهازك، اجعلي `DATABASE_URL` في `.env` يشير إلى القاعدة
التي فيها التعديل. إن كان التعديل على الموقع المنشور، فهي قاعدة Neon.
