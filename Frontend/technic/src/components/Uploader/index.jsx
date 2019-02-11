import cn from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const styles = theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  input: {
    display: 'none'
  }
});

class Uploader extends Component {
  state = {
    files: []
  };

  handleInputChange = e => {
    const files = Object.keys(e.target.files).map(
      key => e.target.files[key].name
    );
    this.setState({ files });
  };

  render = () => {
    const { classes, className, name, title } = this.props;
    const { files } = this.state;

    return (
      <>
        <input
          ref={ref => {
            this.ref = ref;
          }}
          accept="image/*"
          className={classes.input}
          id="file"
          multiple
          type="file"
          name={name}
          onChange={this.handleInputChange}
        />
        <label htmlFor="file">
          <div className={cn(classes.button, className)}>
            <AttachFileIcon />
            <p className={classes.text}>
              {isEmpty(files) ? title : files.join(', ')}
            </p>
          </div>
        </label>
      </>
    );
  };
}

export default withStyles(styles)(Uploader);
