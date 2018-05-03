import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/semantic.min.css';
import axios from 'axios';

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
    console.log(this.state.prayerItem);
    this.state.prayerItem.forEach(item => {
      }).catch(function (error) 
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
            <label className="kanban-label">Prayers</label>
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
    axios.post('/prayer', {
      'title': $('input[name=title]').val(),
      'about': $('textarea[name=about]').val()  
    })
    .then(response => {
      this.setState({
        prayerItem: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  update(prayeritem) {
    prayeritem.map(item => {
      axios.put('/prayer/' + item.id, {
        item
      })
      .then(response => {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });

      // $.ajax({
      //   url: '/prayer/' + item.id,
      //   type: 'put',
      //   headers: {
      //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      //   },
      //   data: item,
      //   success: function (data) {
      //     console.log(data);
      //   },
      //   error: function(a, b, c) {
      //     console.log(a + b + c);
      //   }
      // });
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

function Add(props) {
  return (
    <button className="btn-add" onClick={props.onclick}>
      <i className="far fa-plus-square"></i>
    </button>
  );
}

export default Content;