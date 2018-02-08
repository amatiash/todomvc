'use strict';

import 'j-cache';
import $ from 'jquery';
import JEves from 'jeves'
import template from './list-item.pug';

// ----------------------------------------------------

const ENTER = 13;
const ESC   = 27;

// ----------------------------------------------------

export default class ListItem {
    constructor({id, title, completed}){
        this._eve  = new JEves();
        this.id    = id;
        this.value = title;

        this._findNodes();
        this._bindEvents();

        completed && this._setCompleted();
    }

    // ----------------------------------------------------

    _findNodes(){
        this.$item       = $(template({title: this.value}));
        this.$checkbox   = this.$item.find('input.toggle');
        this.$label      = this.$item.find('label');
        this.$destroyBtn = this.$item.find('.destroy');
        this.$input      = this.$item.find('input.edit');
    }

    _bindEvents(){
        this.$checkbox.on('click', () => this._onCheckboxClick());
        this.$destroyBtn.on('click', () => this._eve.trigger('delete'));
        this.$label.on('dblclick', () => this._setEdit());
    }

    // Event handlers
    // ----------------------------------------------------

    _setEdit(){
        this.$item.addClass('editing');
        this.$input.focus();

        $doc.on('keyup.inputEdit', (e) => this._onEditKeyPress(e));
        this.$input.on('blur', () => this._onEditFinish())
    }

    _onEditFinish(){
        // Ignore if not editing
        if(!this.$item.hasClass('editing'))
            return;

        this.$item.removeClass('editing');

        // Remove key press event
        $doc.off('.inputEdit');

        // ----------------------------------------------------

        let newVal    = this.$input.val(),
            oldVal    = this.$label.text(),
            isChanged = newVal !== oldVal;

        if(isChanged)
            this._eve.trigger('change', this.$input.val());

        // ----------------------------------------------------
    }

    _onEditKeyPress(e){
        if(e.keyCode === ENTER || e.keyCode === ESC)
            this.$input.blur();
    }

    _onCheckboxClick(){
        this.$checkbox.is(':checked') ? this._eve.trigger('checked') : this._eve.trigger('unchecked');
    }

    // ----------------------------------------------------

    _setCompleted(){
        this.$item.addClass('completed');
        this.$checkbox.attr('checked', true);
    }

    // ----------------------------------------------------

    on(){
        this._eve.on.apply(this._eve, arguments);
    }

    off(){
        this._eve.off.apply(this._eve, arguments);
    }

}

// ----------------------------------------------------