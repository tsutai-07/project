const menuItems = [
  {
    name: "Phở Bò Tái Nạm",
    desc: "Nước dùng ninh xương 12 tiếng, thịt bò tái nạm mềm thơm.",
    price: "65.000đ",
    img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500",
    badge: "Bán chạy"
  },
  {
    name: "Bún Chả Hà Nội",
    desc: "Chả nướng than hoa, ăn kèm bún tươi và nước chấm chua ngọt.",
    price: "55.000đ",
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=500",
    badge: "Đặc sản"
  },
  {
    name: "Gỏi Cuốn Tôm Thịt",
    desc: "Cuốn tay từng cuốn, chấm cùng nước mắm chua ngọt đặc trưng.",
    price: "45.000đ",
    img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=500",
    badge: ""
  },
  {
    name: "Cơm Tấm Sườn Bì",
    desc: "Sườn nướng mật ong, bì, chả trứng ăn kèm cơm tấm dẻo thơm.",
    price: "60.000đ",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
    badge: ""
  },
  {
    name: "Bánh Xèo Miền Tây",
    desc: "Vỏ bánh giòn rụm, nhân tôm thịt giá đỗ, cuốn rau sống.",
    price: "50.000đ",
    img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=500",
    badge: "Mới"
  },
  {
    name: "Chè Ba Màu",
    desc: "Món tráng miệng mát lạnh với đậu xanh, đậu đỏ và nước cốt dừa.",
    price: "25.000đ",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
    badge: ""
  }
];

const testimonials = [
  {
    quote: "Món ăn ở đây làm mình nhớ về bữa cơm bà nấu ngày nhỏ. Hương vị rất chuẩn và đậm đà.",
    author: "Nguyễn Thị Lan",
    role: "Khách hàng thân thiết"
  },
  {
    quote: "Không gian ấm cúng, phục vụ nhiệt tình. Phở ở đây ngon nhất mà mình từng ăn ở thành phố.",
    author: "Trần Minh Khoa",
    role: "Food blogger"
  },
  {
    quote: "Đặt bàn cho gia đình 8 người, mọi thứ đều chu đáo. Chắc chắn sẽ quay lại!",
    author: "Lê Hoàng Anh",
    role: "Khách đặt tiệc"
  }
];

let currentTestimonial = 0;
let testimonialInterval;

function renderTestinomials(){
    const track = document.getElementById('testimonialsTrack');
    const dotsWrap = document.getElementById('testimonialsDots');

    if (!track || !dotsWrap) return;

    track.innerHTML = testimonials.map((t, i) => `
        <div class="testimonial ${i === 0 ? 'active' : ''}" data-index="${i}">
            <p class="testimonial__quote">"${t.quote}"</p>
            <p class="testimonial__author">"${t.author}"</p>
            <p class="testimonial__role">"${t.role}"</p>
        </div>
    `).join('');

    dotsWrap.innerHTML = testimonials.map((_, i) =>`
      <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Đánh giá ${i + 1}"></button>
    `).join('');

    dotsWrap.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        gotoTestimonial(parseInt(dot.dataset.index));
        resetTestimonialAutoplay();
      });
    });
}

function gotoTestimonial(index){
    currentTestimonial = index;
    document.querySelectorAll('.testimonial').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.dot').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}

function nextTestimonial(){
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    gotoTestimonial(currentTestimonial);
}

function resetTestimonialAutoplay(){
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}



function renderMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = menuItems.map(item => `
    <div class="menu__card">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="menu__card-body">
        <div class="menu__card-top">
          <h3>${item.name}</h3>
          <span class="menu__price">${item.price}</span>
        </div>
        <p>${item.desc}</p>
        ${item.badge ? `<span class="menu__badge">${item.badge}</span>` : ''}
      </div>
    </div>
  `).join('');
};

function initHeaderScroll(){
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function initBackToTop(){
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
  });
}

function initMobleNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}



document.addEventListener('DOMContentLoaded', () =>{
    renderMenu();
    renderTestinomials();
    initHeaderScroll();
    initMobleNav();
    initBackToTop();
    resetTestimonialAutoplay();
});