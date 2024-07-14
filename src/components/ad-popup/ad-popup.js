import './ad-popup.scss';
import css from './ad-popup.scss?inline'; // css 파일 inline 가져오기 이렇게 하지 않으면 동적으로 css를 못넣음 빌드하면 파일 위치, 명이 다 바뀌기 때문

const adPopupTemplate = document.createElement('template');
adPopupTemplate.innerHTML = `
  <style>${css}</style>
  <div class="ad-popup" role="dialog" aria-modal="true" aria-labelledby="ad-popup__title">
      <a href="#" tabindex="0">
        <img
          class="ad-popup__img"
          src="/assets/images/ad-popup/ad-popup.webp"
          alt="처음 만나는 뷰티 플랫폼, 뷰티컬리"
        />
      </a>
      <h1 class="sr-only" id="ad-popup__title">처음 만나는 뷰티 플랫폼, 뷰티컬리</h1>

      <div class="ad-popup-button-group">
        <button class="ad-popup__today-close" type="button">오늘 하루 안 보기</button>
        <button class="ad-popup__close" type="button">닫기</button>
      </div>
    </div>
`;

export class AdPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(adPopupTemplate.content.cloneNode(true));

    this.closeTime = localStorage.getItem('mainPopup'); // 로컬 스토리지 값 가져옴
  }

  connectedCallback() {
    if (this.closeTime) {
      this.checkedPopup();
    }
    this.closeButtonEvent();
  }

  closeButtonEvent() {
    const button = this.shadowRoot.querySelectorAll('button');

    const handleCloseButton = (e) => {
      const target = e.target;

      if (target.classList.contains('ad-popup__today-close')) {
        this.setCloseTime();
        this.remove();
      }
      if (target.classList.contains('ad-popup__close')) {
        this.remove();
      }
    };

    button.forEach((button) => button.addEventListener('click', handleCloseButton));
  }

  setCloseTime() {
    const currentTime = Date.now(); // 현재 시간 가져옴
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 24시간을 ms로 변환
    const closeTime = currentTime + oneDayInMillis;
    localStorage.setItem('mainPopup', closeTime); // 로컬 스토리지에 저장
  }

  checkedPopup() {
    const currentTime = Date.now(); // 현재 시간 가져옴
    if (currentTime < this.closeTime) {
      this.remove();
    } else {
      localStorage.removeItem('mainPopup');
    }
  }
}
