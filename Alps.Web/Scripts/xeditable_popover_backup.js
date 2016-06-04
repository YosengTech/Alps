
/*
在self.render函数未尾
if (self.single) {
    self.editorEl.attr('editable-form', '$form');
    // transfer `blur` to form
    self.editorEl.attr('blur', self.attrs.blur || (self.buttons === 'no' ? 'cancel' : editableOptions.blurElem));
}

//apply `postrender` method of theme
if (angular.isFunction(theme.postrender)) {
    theme.postrender.call(self);
}

的后面添加下面代码
*/

//PopOver-Mode Edit By Winsan
if (self.elem.hasClass('e-popover-edit') && !self.popoverInit) {
    self.elem.wrap('<div class="popover-edit"></div>');
    self.popoverInit = true;
}