import React from 'react'
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'

export default class BaseDef extends BaseComponent{
	shouldComponentUpdate(){
		return false;
	}
}