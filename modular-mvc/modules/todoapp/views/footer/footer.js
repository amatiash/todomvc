'use strict';

import $ from 'jquery';
import template from './footer.pug';

// ----------------------------------------------------

let controller, eve;

// ----------------------------------------------------

let view = {

    $footer     : null,
    $clearBtn   : null,
    $allLink    : null,
    $activeLink : null,
    $doneLink   : null,
    $filterLinks: null,
    $counter    : null,

    init: (_controller, _eve, wrap) =>{
        controller = _controller;
        eve        = _eve;

        view.$footer      = $(template({}));
        view.$clearBtn    = view.$footer.find('button.clear-completed');
        view.$counter     = view.$footer.find('span.todo-count strong');
        view.$filterLinks = view.$footer.find('a');
        view.$allLink     = view.$footer.find('[href="#/"]');
        view.$activeLink  = view.$footer.find('[href="#/active"]');
        view.$doneLink    = view.$footer.find('[href="#/completed"]');
        view.$filterLinks = view.$footer.find('a');

        view.$clearBtn.on('click', () => eve.trigger('clearCompleted'));

        wrap.append(view.$footer);
    },

    setCounter: (val) => view.$counter.text(val),

    setActiveFilter: (val) =>{
        let $selected = view.$filterLinks.filter('.selected'),
            $toSetSelected;

        // ----------------------------------------------------

        switch(val){
            case 'active':
                $toSetSelected = view.$activeLink;
                break;
            case 'completed':
                $toSetSelected = view.$doneLink;
                break;
            case '':
                $toSetSelected = view.$allLink;
                break;
            default:
                return;
        }

        // ----------------------------------------------------

        $selected.removeClass('selected');
        $toSetSelected.addClass('selected');
    },
};

// ----------------------------------------------------

export default view;
