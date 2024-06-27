type Callback = {
  onClick?: () => void
}

type SelectedChatPersonType = {
  name: string;
  avatar: string;
}

type SelectedChatType = {
  date: string;
  messages: {
    type: string;
    text: string;
    time: string;
    form: string;
    read: boolean;
  }
}


type ButtonType = {
  type: string;
  label: string;
  page: string;
  text: string;
  href?: string;
  target?: string
  form?: string;
  view?: string;
  size?: string;
  width?: string;
  iconLeft?: string;
  iconRight?: string;
  "data-page"?: string;
  style?: string;
}

type TextFieldType = {
  value: string;
  validate: () => void;
  view: string;
  required: boolean;
}

type APIError = {
  reason: string;
};

export {
  Callback,
  SelectedChatPersonType,
  SelectedChatType,
  ButtonType,
  TextFieldType,
  APIError
}
