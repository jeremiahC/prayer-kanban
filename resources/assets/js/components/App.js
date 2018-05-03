import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/semantic.min.css';
import axios from 'axios';

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand">Prayer Kanban</div>
        <div></div>
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li className="item notification"><i className="fas fa-bell"></i></li>
            <li className="item user"><img className="profile-img" alt="User Profile"/></li>
          </ul>
        </div>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isModalShow: false,
      prayerItem: [],
      title: '',
      about: '',
      created_at: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.drag = this.drag.bind(this);
  }s

  componentDidMount() {
    axios.get('/prayer')
      .then(response => {
        this.setState({
          prayerItem: response.data
        });
      }).catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let prayeritem = {
      prayer: [],
      praying: [],
      answered: []
    }

    this.state.prayerItem.forEach(item => {
      prayeritem[item.category].push(
        <div  key={item.id}
              id={item.id}
              className="prayer-item" 
              draggable
              onDragStart={this.drag}>
          <div className="prayer-title">
            <label>{item.title}</label>
            <i className="fas fa-edit"></i>
            <p className="date">{item.created_at}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="content">
        {this.renderModal(this.state.isModalShow)}
        <div className="kanban">
          <div className="kanban-section">
            <label className="kanban-label">Prayer</label>
            <Add
              onclick={this.openModal}
            />
            <div className="prayer-section"
                  onDragOver={(e) => this.allowDrop(e)}
                  onDrop={(e) => this.drop(e, 'prayer')}>
              {prayeritem.prayer}
            </div>
          </div>
          <div className="kanban-section">
            <label className="kanban-label">Praying</label>
            {/*}<Add onclick={this.openModal}/>*/}
            <div className="prayer-section" 
                  onDragOver={(e) => this.allowDrop(e)}
                  onDrop={(e) => this.drop(e, 'praying')}>
                {prayeritem.praying}
            </div>
          </div>
          <div className="kanban-section">
            <label className="kanban-label">Answered</label>
            {/*}<Add onclick={this.openModal}/>*/}
            <div className="prayer-section"
                  onDragOver={(e) => this.allowDrop(e)}
                  onDrop={(e) => this.drop(e, 'answered')}>
                {prayeritem.answered}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'text' ? target.value : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    event.preventDefault();

    let prayerItem = {
      title: this.state.title,
      id: Date.now(),
      category: 'prayer',
      created_at: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    }

    this.insert();
  }

  allowDrop(event) {
    event.preventDefault();
  }

  insert() {
    $.ajax({
      url: 'prayer',
      type: 'post',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      data: {
        'title': $('input[name=title]').val(),
        'about': $('textarea[name=about]').val()
      },
      success: function(data) {
        this.setState(prevState => ({
          prayerItem: prevState.prayerItem.concat(data),
          title: '',
          about: '',
          isModalShow: false,
        }));
      }.bind(this),
      error: function(a, b, c) {
        console.log(a + b + c);
      }
    });
  }

  update(prayeritem) {
    prayeritem.map(item => {
      console.log(item);
      $.ajax({
        url: '/prayer/' + item.id,
        type: 'put',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: item,
        success: function (data) {
          console.log(data);
        },
        error: function(a, b, c) {
          console.log(a + b + c);
        }
      });
    });

  }

  drop(event, category) {
    event.preventDefault();

    let id = event.dataTransfer.getData("id");

    let prayeritem = this.state.prayerItem.filter(item => {
      if (item.id == id) {
        item.category = category;

        return item;
      }
    });

    this.update(prayeritem);
    this.setState({
      ...this.state,
      prayeritem
    });

    alertify.message('Prayer Status Change to ' + category);
  }

  drag(event) {
    event.dataTransfer.setData("id", event.target.id);
  }

  openModal() {
    this.setState({
      isModalShow: true
    });
  }

  closeModal() {
    this.setState({
      isModalShow: false
    });
  }

  renderModal(state) {
    let isShow = state ? 'm-open' : 'm-close';

    return <Modal
              isShow={isShow}
              onclick={this.closeModal}
              submit={this.handleClick}
              onChange={this.handleInputChange}
              value={this.state.title}
            />;
  }
}

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

function Add(props) {
  return (
    <button className="btn-add" onClick={props.onclick}>
      <i className="far fa-plus-square"></i>
    </button>
  );
}

ReactDOM.render(
  <div>
    <Navbar />
    <Content />
  </div>,
  document.getElementById('root')
);
