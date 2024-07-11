import './footer.scss';
import css from './footer.scss?inline'; // css 파일 inline 가져오기 이렇게 하지 않으면 동적으로 css를 못넣음 빌드하면 파일 위치, 명이 다 바뀌기 때문

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <style>${css}</style>
        <footer class="footer">
      <div class="footer__inner">
        <div class="footer__top">
          <section class="footer__customer-service">
            <h2 class="footer__title">고객행복센터</h2>
            <div class="footer__contact">
              <p class="footer__phone">1644-1107</p>
              <p class="footer__hours">월~토요일 오전 7시 - 오후 6시</p>
            </div>
            <div class="footer__inquiry">
              <div class="footer__inquiry-item footer__inquiry-item--kakao">
                <button type="button" class="footer__inquiry-btn">카카오톡 문의</button>
                <div class="footer__inquiry-time-group">
                  <p class="footer__inquiry-time">월~토요일 | 오전 7시 - 오후 6시</p>
                  <p class="footer__inquiry-time">일/공휴일 | 오전 7시 - 오후 1시</p>
                </div>
              </div>
              <div class="footer__inquiry-item footer__inquiry-item--one-on-one">
                <button type="button" class="footer__inquiry-btn">1:1 문의</button>
                <div class="footer__inquiry-time-group">
                  <p class="footer__inquiry-time">365일</p>
                  <p class="footer__inquiry-description">
                    고객센터 운영시간에 순차적으로 답변드리겠습니다.
                  </p>
                </div>
              </div>
              <div class="footer__inquiry-item footer__inquiry-item--bulk-order">
                <button type="button" class="footer__inquiry-btn">대량주문 문의</button>
                <div class="footer__inquiry-time-group">
                  <p class="footer__inquiry-time">월~금요일 | 오전 9시 - 오후 6시</p>
                  <p class="footer__inquiry-time">점심시간 | 낮 12시 - 오후 1시</p>
                </div>
              </div>
              <div class="footer__inquiry-item footer__inquiry-item--email">
                <p class="footer__inquiry-email">
                  비회원 문의 : <a href="mailto:help@karlycorp.com">help@karlycorp.com</a>
                </p>
                <p class="footer__inquiry-email">
                  비회원 대량주문 문의 : <a href="mailto:help@karlycorp.com">help@karlycorp.com</a>
                </p>
              </div>
            </div>
          </section>
          <section class="footer__about">
            <h2 class="sr-only">회사 정보</h2>
            <nav aria-label="회사 정보 링크">
              <ul class="footer__nav">
                <li class="footer__nav-item"><a href="#" class="footer__link">칼리소개</a></li>
                <li class="footer__nav-item">
                  <a href="#" class="footer__link">칼리소개영상</a>
                </li>
                <li class="footer__nav-item"><a href="#" class="footer__link">인재채용</a></li>
                <li class="footer__nav-item"><a href="#" class="footer__link">이용약관</a></li>
                <li class="footer__nav-item">
                  <a href="#" class="footer__link">개인정보처리방침</a>
                </li>
                <li class="footer__nav-item"><a href="#" class="footer__link">이용안내</a></li>
              </ul>
            </nav>
            <address class="footer__address">
              <p>
                법인명 (상호) : 주식회사 칼리 | 사업자등록번호 : 261-81-23567 |
                <a href="#" class="footer__address-link">사업자정보 확인</a>
              </p>
              <p>통신판매업 : 제 2018-서울강남-01646 호 | 개인정보보호책임자 : 이원준</p>
              <p>주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) | 대표이사 : 김슬아</p>
              <p>
                입점문의 : <a href="#" class="footer__address-link">입점문의하기</a> | 제휴문의 :
                <a href="mailto:business@kurlycorp.com" class="footer__address-link"
                  >business@karlycorp.com</a
                >
              </p>
              <p>
                채용문의 :
                <a href="mailto:recruit@kurlycorp.com" class="footer__address-link"
                  >recruit@karlycorp.com</a
                >
              </p>
              <p>팩스 : 070-7500-6098</p>
            </address>
            <ul class="footer__social-list">
              <li class="footer__social-item">
                <a href="#" class="footer__social-link footer__social-link--naver">
                  <span class="sr-only">네이버 블로그</span>
                </a>
              </li>
              <li class="footer__social-item">
                <a href="#" class="footer__social-link footer__social-link--facebook">
                  <span class="sr-only">페이스북</span>
                </a>
              </li>
              <li class="footer__social-item">
                <a href="#" class="footer__social-link footer__social-link--instagram">
                  <span class="sr-only">인스타그램</span>
                </a>
              </li>
              <li class="footer__social-item">
                <a href="#" class="footer__social-link footer__social-link--naver-post">
                  <span class="sr-only">네이버 포스트</span>
                </a>
              </li>
              <li class="footer__social-item">
                <a href="#" class="footer__social-link footer__social-link--youtube">
                  <span class="sr-only">유튜브</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div class="footer__certificates">
          <h2 class="sr-only">인증 정보</h2>
          <ul class="footer__certificates-list">
            <li class="footer__certificates-item">
              <img
                src="/assets/icons/footer/Isms.svg"
                alt="Isms 인증 뱃지"
                class="footer__certificate-img"
              />
              <p class="footer__certificates-text">
                [인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영
                <br />(심사받지 않은 물리적 인프라 제외) <br />[유효기간] 2022.01.19 ~ 2025.01.18
              </p>
            </li>
            <li class="footer__certificates-item">
              <img
                src="/assets/icons/footer/Privacy.svg"
                alt="개인정보보호 우수 인증 뱃지"
                class="footer__certificate-img"
              />
              <p class="footer__certificates-text">
                개인정보보호 우수 웹사이트
                <br />개인정보처리시스템 인증 (ePRIVACY PLUS)
              </p>
            </li>
            <li class="footer__certificates-item">
              <img
                src="/assets/icons/footer/Tosspayments.svg"
                alt="토스페이먼츠 로고"
                class="footer__certificate-img"
              />
              <p class="footer__certificates-text">
                토스페이먼츠 구매안전(에스크로) 서비스
                <br />를 이용하실 수 있습니다.
              </p>
            </li>
            <li class="footer__certificates-item">
              <img
                src="/assets/icons/footer/Ourbank.svg"
                alt="우리은행 로고"
                class="footer__certificate-img"
              />
              <p class="footer__certificates-text">
                고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보
                <br />증 계약을 체결하여 안전거래를 보장하고 있습니다.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__bottom-text">
          마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는
          마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br />
          마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다.
          컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
        </p>
        <p class="footer__bottom-text">&copy; KARLY CORP. ALL RIGHTS RESERVED</p>
      </div>
    </footer>
`;

export class footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }

  connectedCallback() {}
}
