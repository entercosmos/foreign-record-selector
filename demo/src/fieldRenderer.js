import React, {Component} from 'react'
import {render} from 'react-dom'
import sample from 'lodash/sample'
import {css, injectGlobal} from 'emotion'

import CheckboxField from '@pndr/checkbox-field'
import AttachmentField from '@pndr/attachment-field'
import LongTextField from '@pndr/long-text-field'
import SingleLineTextField from '@pndr/single-line-text-field'
import SingleSelectField from '@pndr/single-select-field'
import MultipleSelectField from '@pndr/multiple-select-field'
import NumberField from '@pndr/number-field'

const generateAttachment = (i) => {

    const cat = sample(['wanderlust', 'water', 'canada', 'mountain', 'beach'])

    return {
        id: `att${i}`,
        type: 'image/jpeg',
        filename: `${cat} ${i}`,
        thumbnails: {
            small: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            medium: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            large: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
        },
        url: `https://source.unsplash.com/random/400x360?${cat}`
    }
}
const CELLS = {
    'fld1': {
        text: 'Luke Skywalker'
    },
    'fld2': {
        checked: true
    },
    'fld3': {
        attachments: [{
            id: 'att1',
            type: 'video/ogg',
            filename: 'Video',
            thumbnails: null,
            url: 'https://www.w3schools.com/html/mov_bbb.ogg'
        }, {
            id: 'att2',
            type: 'audio/mpeg',
            filename: 'Audio',
            thumbnails: null,
            url: 'https://dl.airtable.com/AILblIU3RJfJTtudwUE8_%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97'
        }, generateAttachment(3), {
            id: 'att4',
            type: 'image/gif',
            filename: 'GIF',
            thumbnails: {
                small: {
                    url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                },
                medium: {
                    url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                },
                large: {
                    url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                },
            },
            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
        }]
    },
    'fld4': {
        number: 32.25
    },
    'fld5': {
        records: [{
            id: 'rec1',
            name: 'Luke Skywalker'
        }, {
            id: 'rec2',
            name: 'Leia Organa'
        }, {
            id: 'rec3',
            name: 'Han Solo'
        }, {
            id: 'rec4',
            name: 'Jar Jar Binks'
        }]
    },
    'fld6': {
        optionIds: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6']
    },
    'fld7': {
        optionId: 'opt5'
    },
    'fld8': {
        longText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'fld9': {
        text: 'Greatest Jedi the galaxy has ever known.'
    },
    'fld10': {
        attachments: [
            generateAttachment(1),
            generateAttachment(2),
            generateAttachment(3),
            generateAttachment(4),
            generateAttachment(5),
        ]
    }
}

class Viewport extends React.Component {

    render() {

        return (
            <div
                className={css`
                    background-color: #e9ebee;
                    padding: 20px;
                `}
            >
                {this.props.children}
            </div>
        )
    }
}

const fieldRenderer = ({id, field, props}) => {

    const renderers = {
        singleLineText: ({props, cell}) => (
            <SingleLineTextField
                {...props}
                text={cell.text}
            />
        ),
        longText: ({props, cell}) => (
            <LongTextField
                {...props}
                longText={cell.longText}
            />
        ),
        checkbox: ({props, cell}) => (
            <CheckboxField
                {...props}
                checked={cell.checked}
            />
        ),
        attachment: ({props, cell}) => (
            <AttachmentField
                {...props}
                attachments={cell.attachments}
            />
        ),
        linkToAnotherRecord: () => <div>not supported</div>,
        multipleSelect: ({props, field, cell}) => (
            <MultipleSelectField
                {...props}
                optionIds={cell.optionIds}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        singleSelect: ({props, field, cell}) => (
            <SingleSelectField
                {...props}
                optionId={cell.optionId}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        number: ({props, field, cell}) => (
            <NumberField
                {...props}
                number={cell.number}
                allowNegativeNumbers={field.options.allowNegativeNumbers}
                numberFormatId={field.options.numberFormatId}
                precisionId={field.options.precisionId}
            />
        )
    }

    const renderer = renderers[field.typeId]

    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }

    const cell = CELLS[field.id]

    return renderer({
        id,
        field,
        props,
        cell
    })
}

export default fieldRenderer