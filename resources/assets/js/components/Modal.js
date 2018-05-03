import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  render() {
    let classname = 'modal ' + this.props.isShow;
    return (
      <div>
        <div className={classname}>
          <div className="modal-content">
            <span className="close" onClick={this.props.onclick}>&times;</span>
            <form className="form">
              <input type="text"
                     className="form-field"
                     name="title"
                     placeholder="What is the Prayer about?"
                     onChange={this.props.onChange}
                     value={this.props.value}/>
              <textarea className="form-field"
                        name="about"
                        rows="10"
                        placeholder="Tell me more..."
                        onChange={this.props.onChange}>
              </textarea>
              <input className="submit" type="submit" value="Submit" onClick={this.props.submit} />
            </form>
          </div>
        </div>
        <div className="m-overlay"></div>
      </div>
    );
  }
}

export default Modal;