// @ts-nocheck
import {validateEmail, validateName, validateLength, validatePhone, validateLogin} from "../../../helpers/validate";
import {formToJson} from "../../../helpers/formToJson";
import {Callback} from "../../../types/types";
import isAuth from "../../../middleware/isAuth";
import {authApi} from "../../../api/auth";
import {userApi} from "../../../api/user";

type ProfileDataType = {
  phone: string,
  second_name: string,
  first_name: string,
  login: string,
  email: string,
  avatar: string,
}

export default class ProfileSetting extends isAuth {
  constructor(props: Callback ) {
    super({
      ...props,
      validateEmail: validateEmail,
      validateName: validateName,
      validateLength: validateLength,
      validatePhone: validatePhone,
      validateLogin: validateLogin,
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          userApi.updateUser(formToJson(e.target))
            .then(({response}) => {
              window.router.go('/profile')
            })
        }
      },
      onClickBack: (e: Event) => {
        e.preventDefault();
        window.history.back()
      },
      profileData:{

      }
    });
  }

  protected init(): void {
    this.props.events = {
      submit: this.props.onClick
    }
  }

  componentDidMount() {
    super.componentDidMount();

    authApi.getUser()
      .then(({response:ProfileDataType}) => this.setProps({profileData: JSON.parse(response)}))
  }

  protected render(): string {
    const { profileData } = this.props;

    return `
      {{#> LayoutGrid}}
        <div class="profile">
          {{#*inline "leftContent" }}
            <div class="profile__back">
              {{ Button iconLeft="Arrow" view="primary" form="round" className="profile__go-back" onClick=onClickBack }}
            </div>
          {{/inline}}
    
          {{#*inline "rightContent" }}
            <div class="profile__content">
              <div class="profile-avatar">
                {{{ LoadAvatar avatar="${profileData.avatar}" }}}
              </div>
  
              {{#if profileData.email }}
                <form class="profile-info">
                  {{ TextFieldLabel label="Почта" type="text" value="${profileData?.email}" name="email" className="profile-info-field inline " validate=validateEmail}}
                  {{ TextFieldLabel label="Логин" type="text" value="${profileData?.login}" name="login" className="profile-info-field inline " validate=validateLogin}}
                  {{ TextFieldLabel label="Имя" type="text" value="${profileData?.first_name}" name="first_name" className="profile-info-field inline " validate=validateName}}
                  {{ TextFieldLabel label="Фамилия" type="text" value="${profileData?.second_name}" name="second_name" className="profile-info-field inline " validate=validateName}}
<!--                  {{ TextFieldLabel label="Имя в чате" type="text" value="ivanivanov" name="display_name" className="profile-info-field inline " validate=validateLogin}}-->
                  {{ TextFieldLabel label="Телефон" type="tel" value="${profileData?.phone}" name="phone" className="profile-info-field inline " validate=validatePhone}}
    
                  <div class="profile-info__buttons">
                    {{ Button text="Сохранить" view="primary" width="full" type="submit"}}
                  </div>
    
                </form>
              {{/if}}
            </div>
          {{/inline}}
        </div>
      {{/LayoutGrid}}
    `;
  }
}

