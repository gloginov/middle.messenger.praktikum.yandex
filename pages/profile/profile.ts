// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './profile.scss'
// import Block from "../../lib/models/Block";
import isAuth from "../../middleware/isAuth";
import {authApi} from "../../api/auth";

export default class ProfilePage extends isAuth {
  constructor() {
    super({
      onClick: (e: Event) => {
        e.preventDefault();
        authApi.logout()
          .then(() => {
            window.location.href = window.location.origin + '/'
            sessionStorage.clear()
          })
      },
      onClickBack: (e: Event) => {
        e.preventDefault();
        window.history.back()
      },
      profileData: {}
    });
  }

  componentDidMount() {
    super.componentDidMount();

    authApi.getUser()
      .then(({response}) => this.setProps({profileData: JSON.parse(response)}))
  }

  protected render(): string {
    const { profileData } = this.props;

    return `
      {{#> LayoutGrid}}
        <div   class="profile">
          {{#*inline "leftContent" }}
            <div class="profile__back">
              {{ Button iconLeft="Arrow" view="primary" form="round" className="profile__go-back" onClick=onClickBack  }}
            </div>
          {{/inline}}
    
          {{#*inline "rightContent" }}
            <div class="profile__content">
              {{{ LoadAvatar avatar="${profileData.avatar}" }}}
               
              {{#if profileData.email }}
                <div class="profile-info">
                  {{ TextFieldLabel label="Почта" type="text" errorMessage="" value="${profileData.email}" name="email" className="profile-info-field inline profile-info-field_unactive"}}
                  {{ TextFieldLabel label="Логин" type="text" errorMessage="" value="${profileData.login}" name="login" className="profile-info-field inline profile-info-field_unactive"}}
                  {{ TextFieldLabel label="Имя" type="text" errorMessage="" value="${profileData.first_name}" name="first_name" className="profile-info-field inline profile-info-field_unactive"}}
                  {{ TextFieldLabel label="Фамилия" type="text" errorMessage="" value="${profileData.second_name}" name="second_name" className="profile-info-field inline profile-info-field_unactive"}}
<!--                  {{ TextFieldLabel label="Имя в чате" type="text" errorMessage="" value="ivanivanov" name="display_name" className="profile-info-field inline profile-info-field_unactive"}}-->
                  {{ TextFieldLabel label="Телефон" type="text" errorMessage="" value="${profileData.phone}" name="phone" className="profile-info-field inline profile-info-field_unactive"}}
  
                  <div class="profile-info__buttons">
                    {{ Button text="Изменить данные" view="secondary" width="full" href="/setting"}}
                    {{ Button text="Изменить пароль" view="secondary" width="full" href="/setting/password"}}
                    {{ Button text="Выйти" view="alert" width="full" onClick=onClick}}
                  </div>
                </div>
              {{/if}}

            </div>
          {{/inline}}
        </div>
      {{/LayoutGrid}}

    `;
  }
}

// export { default as ProfilePage } from './profile.hbs?raw'
