/*
이 코드는 ReusableModal이라는 사용자 정의 웹 컴포넌트를 정의합니다.
이 컴포넌트는 재사용 가능한 모달 다이얼로그를 생성합니다.

주요 특징:
1. Shadow DOM을 사용하여 스타일과 구조를 캡슐화합니다.
2. <slot> 요소를 사용하여 헤더, 본문, 푸터의 컨텐츠를 유연하게 정의할 수 있습니다.
3. width, height, custom-style 속성을 통해 모달의 크기와 스타일을 동적으로 조정할 수 있습니다.
4. showModal과 close 메서드를 제공하여 모달을 쉽게 열고 닫을 수 있습니다.
5. 모달이 열릴 때 배경 스크롤을 방지하는 기능이 포함되어 있습니다.

사용 방법:
1. HTML에서 <c-modal> 태그를 사용하여 모달을 생성합니다.
2. slot="header", slot="body", slot="footer" 속성을 사용하여 각 섹션의 내용을 정의합니다.
3. width, height, custom-style 속성을 사용하여 모달의 외관을 조정합니다.
4. JavaScript에서 showModal()과 close() 메서드를 호출하여 모달을 제어합니다.

이 컴포넌트는 재사용성과 유연성을 극대화하여 다양한 상황에서 쉽게 모달을 구현할 수 있게 해줍니다.
*/

import css from './modal.scss?inline';

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${css}</style>
      <dialog class="modal-dialog">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </dialog>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.dialog = this.shadowRoot.querySelector('dialog');
  }

  static get observedAttributes() {
    return ['width', 'height', 'custom-style'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'custom-style') {
        this.updateStyle();
      } else {
        this.updateSize();
      }
    }
  }

  updateSize() {
    this.dialog.style.width = this.getAttribute('width') || 'auto';
    this.dialog.style.height = this.getAttribute('height') || 'auto';
  }

  updateStyle() {
    const customStyle = this.getAttribute('custom-style') || '';
    const styleElement = this.shadowRoot.querySelector('style');
    styleElement.textContent += customStyle;
  }

  showModal() {
    this.dialog.classList.add('show');
    this.dialog.showModal();
    this.toggleBackgroundScroll(true);
  }

  close() {
    this.dialog.classList.add('hide');
    this.dialog.addEventListener(
      'animationend',
      () => {
        this.dialog.close();
        this.dialog.classList.remove('hide');
        this.toggleBackgroundScroll(false);
      },
      { once: true }
    );
  }

  toggleBackgroundScroll(prevent) {
    document.body.style.overflow = prevent ? 'hidden' : '';
  }
}

customElements.define('c-modal', Modal);
