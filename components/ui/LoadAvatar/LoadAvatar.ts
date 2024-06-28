// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Block from '../../../lib/models/Block';
import './LoadAvatar.scss'
import {userApi} from "../../../api/user";

class LoadAvatar extends Block {
  constructor(props: undefined) {
    super({
      ...props,
      onChangeAvatar: (e: Event) => {
        if (e.target instanceof Element) {
          const data = new FormData();
          data.append('avatar', e.target?.files[0])

          userApi.changeAvatar(data)
            .then(({response}) => {
              window.router.go('/profile')
            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })
        }
      }
    });
  }

  protected init(): void {
    this.props.events = {
      change: this.props.onChangeAvatar
    }
  }

  protected render(): string {
    const {avatar} = this.props;

    return `
    <form class="profile-avatar" enctype="multipart/form-data">
      <label for="avatar">
        {{{ Avatar avatar="${avatar}"  width="130px" height="130px" }}}
        <input type="file" name="avatar" id="avatar">
        <span class="profile-avatar__upload">
          <span class="profile-avatar__upload-text">
            Загрузить изображение
          </span>
        </span>
      </label>
    </form>
    `;
  }
}

export { LoadAvatar };
