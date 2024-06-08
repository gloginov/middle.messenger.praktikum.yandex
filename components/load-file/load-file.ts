import './load-file.scss'
import Block from "../../lib/models/Block";

export class FormLoadImage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <form class="form__form form__form_load-image">
      <div class="form__content">
        {{> Text style="font-size:15px;font-weight:500;color:var(--color-black);" text="Загрузите файл" className="form__title" }}

        <label>
          <input type="file">
          <a href="#">
            Выбрать файл на компьютере
          </a>
        </label>
      </div>

    <div class="form__footer">
      {{ Button text="Поменять" view="primary" width="full" data-page="chats"}}
    </div>
</form>

    `;
  }
}
