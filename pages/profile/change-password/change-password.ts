// @ts-nocheck
import {validateLength} from "../../../helpers/validate";
import {formToJson} from "../../../helpers/formToJson";
import {Callback} from "../../../types/types";
import isAuth from "../../../middleware/isAuth";
import {authApi} from "../../../api/auth";
import {userApi} from "../../../api/user";

export default class ProfileChangePassword extends isAuth {
  constructor(props: Callback) {
    super({
      ...props,
      validateLength: validateLength,
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          userApi.changePassword(formToJson(e.target))
            .then(({response, status}) => {
              if (status === 200) {
                window.router.go('/profile')
              }
            })
        }
      },
      onClickBack: (e: Event) => {
        e.preventDefault();
        window.history.back()
      },
      profileData: {}
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
      .then(({response}) => self.setProps({profileData: JSON.parse(response)}))
  }

  protected render(): string {
    const { profileData } = this.props;

    return `
      {{#> LayoutGrid}}
        <div   class="profile">
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
                  {{ TextFieldLabel label="Старый пароль" type="password" name="oldPassword" className="profile-info-field inline " validate=validateLength}}
                  {{ TextFieldLabel label="Новый пароль" type="password" name="newPassword" className="profile-info-field inline " validate=validateLength}}
    
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

