import Block from "./Block";

class TextFieldModel<Props extends object> extends Block{
  constructor(props: Props = {} as Props) {
    super({
      ...props,
      value: props.value ? props.value : '',
      message: 'Обязательно для заполнения',
      showError: false
    })
  }

  protected init(): void {
    this.props.events = {
      blur: this.onBlurField.bind(this)
    }
  }

  onBlurField(e): void {
    const value = e.currentTarget.value.toString();

    this.setProps({
      value,
      showMessage:
        this.props.validate && (!this.props.validate(value).result && (value.length > 0)) ?
          this.props.validate(value).message
          :
          this.props.message
      ,
      showError:
        !!value ?
          !!this.props.validate ?
            !this.props.validate(value).result
            :
            !value
          :
          !value
    })
  }
}

export default TextFieldModel;
