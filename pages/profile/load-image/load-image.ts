import Block from "../../../lib/models/Block";

export default class ProfileLoadImage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
    {{#> LayoutGrid}}
      <div class="profile">
        {{#*inline "leftContent" }}
          <div class="profile__back">
            {{ Button iconLeft="Arrow" view="primary" form="round" className="profile__go-back" }}
          </div>
        {{/inline}}

        {{#*inline "rightContent" }}
          <div class="profile__content">
            <a href="#" data-page="profile/load-image" class="profile-avatar">
              <label for="">
                {{{ Avatar avatar="https://i.pravatar.cc/300" width="130px" height="130px" }}}
                <input type="file"  name="avatar">
                <span class="profile-avatar__upload">
                  <span class="profile-avatar__upload-text">
                    Upload image...
                  </span>
                </span>
              </label>
            </a>

            <div class="profile-info">
              {{ TextFieldLabel label="Почта" type="text" errorMessage="" value="ivanivanov@mm.rr" name="login" className="profile-info-field inline profile-info-field_unactive"}}
              {{ TextFieldLabel label="Логин" type="text" errorMessage="" value="ivanivanov" name="login" className="profile-info-field inline profile-info-field_unactive"}}
              {{ TextFieldLabel label="Имя" type="text" errorMessage="" value="Василий" name="login" className="profile-info-field inline profile-info-field_unactive"}}
              {{ TextFieldLabel label="Фамилия" type="text" errorMessage="" value="Пупкин" name="login" className="profile-info-field inline profile-info-field_unactive"}}
              {{ TextFieldLabel label="Имя в чате" type="text" errorMessage="" value="ivanivanov" name="login" className="profile-info-field inline profile-info-field_unactive"}}
              {{ TextFieldLabel label="Телефон" type="text" errorMessage="" value="+7 (999) 999 99 99" name="login" className="profile-info-field inline profile-info-field_unactive"}}

              <div class="profile-info__buttons">
                {{ Button text="Изменить данные" view="secondary" width="full" data-page="setting"}}
                {{ Button text="Изменить пароль" view="secondary" width="full" data-page="chats"}}
                {{ Button text="Выйти" view="alert" width="full" data-page="chats"}}
              </div>
            </div>
          </div>

            {{#> LayoutCentered position="fixed"}}
              {{#> FormContainer }}
                {{ FormLoadImage }}
              {{/FormContainer}}
            {{/LayoutCentered}}
        {{/inline}}
      </div>
    {{/LayoutGrid}}
    `;
  }
}

