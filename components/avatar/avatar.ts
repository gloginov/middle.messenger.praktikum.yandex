import './avatar.scss'
import Block from '../../lib/models/Block';
import {resourcesApi} from "../../api/resources";

class Avatar extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  protected render(): string {

    const { avatar } = this.props;
    return `
      <div class="avatar {{ className }}">
        {{#if avatar}}
          <img class="avatar-image" style="width: {{ width }}; height: {{ height }}" src="${import.meta.env.VITE_API_URL + '/resources/' + avatar}" alt="{{ name }}" onError="this.src = 'https://i.pravatar.cc/300'" />
        {{else}}
          <div class="avatar-stub" style="width: {{ width }}; height: {{ height }}">
             <span class="avatar-stub__initials">{{ getFirstLetter name }}</span>
          </div>
        {{/if}}
      </div>
    `
  }
}

export { Avatar };

