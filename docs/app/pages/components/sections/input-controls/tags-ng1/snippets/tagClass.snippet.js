options.tagClass = function(tag, index, selected) {
    return {
        'tag-first': index === 0,
        'tag-special': (tag.text === 'Obsolete') || selected
    };
}