class cmsmastersDemosPreview {
    elements = {};
    constructor() {
        this.initElements(),
        this.bindEvents()
    }
    initElements() {
        this.elements.$html = jQuery("html"),
        this.elements.$container = jQuery(".cmsmasters-demos-preview"),
        this.elements.$previewToggle = jQuery(".cmsmasters-preview__toggle"),
        this.elements.$previewClose = jQuery(".cmsmasters-preview__close"),
        this.elements.$previewDemo = jQuery(".cmsmasters-palettes-preview__demo"),
        this.elements.$previewPalettes = jQuery(".cmsmasters-color-palettes"),
        this.elements.$previewApply = jQuery(".cmsmasters-palettes-preview__apply"),
        this.elements.$palettesDemoHeading = jQuery(".cmsmasters-palettes-preview__demo-heading"),
        this.elements.$palettesPreviewToggle = jQuery(".cmsmasters-palettes-preview__toggle")
    }
    bindEvents() {
        const e = this.elements.$container.attr("data-site-name");
        this.elements.$html.attr("data-cmsmasters-color-palette", e),
        jQuery(".cmsmasters-palette-apply-active .cmsmasters-palettes-preview__apply").addClass("cmsmasters-palettes-preview__reset"),
        jQuery(".cmsmasters-palette-apply-active .cmsmasters-palettes-preview__reset").text("Reset"),
        this.elements.$previewToggle.on("click", this.togglePreview.bind(this)),
        this.elements.$previewClose.on("click", this.closePreview.bind(this)),
        this.elements.$palettesDemoHeading.on("click", this.clickPalettesDemoHeading.bind(this)),
        this.elements.$previewApply.on("click", this.clickPreviewApply.bind(this)),
        this.elements.$palettesPreviewToggle.one("click", function() {
            jQuery(".cmsmasters-color-palettes input.cmsmasters-palette-color").each(function(e, t) {
                this.initPalettesColors(e, t)
            }
            .bind(this))
        }
        .bind(this))
    }
    togglePreview(e) {
        const t = jQuery(e.currentTarget);
        if ("active" === t.attr("data-condition"))
            return t.attr("data-condition", "disable"),
            void this.elements.$html.attr("data-cmsmasters-condition", "disable");
        this.elements.$previewToggle.attr("data-condition", "disable"),
        t.attr("data-condition", "active"),
        this.elements.$html.attr("data-cmsmasters-condition", `active-${t.attr("data-name")}`)
    }
    closePreview() {
        this.elements.$html.attr("data-cmsmasters-condition", "disable"),
        this.elements.$previewToggle.attr("data-condition", "disable")
    }
    clickPalettesDemoHeading(e) {
        const t = jQuery(e.currentTarget).closest(".cmsmasters-palettes-preview__demo");
        if (!t.hasClass("cmsmasters-palette-apply-no-active"))
            return;
        this.elements.$previewDemo.addClass("cmsmasters-palette-apply-no-active").removeClass("cmsmasters-palette-apply-active"),
        t.removeClass("cmsmasters-palette-apply-no-active").addClass("cmsmasters-palette-apply-active"),
        jQuery(".cmsmasters-palettes-preview__demo .cmsmasters-palettes-preview__apply").removeClass("cmsmasters-palettes-preview__reset").text("Apply"),
        jQuery(".cmsmasters-palette-apply-active .cmsmasters-palettes-preview__apply").addClass("cmsmasters-palettes-preview__reset"),
        jQuery(".cmsmasters-palette-apply-active .cmsmasters-palettes-preview__reset").text("Reset");
        const s = t.attr("data-palette-index");
        this.elements.$html.attr("data-cmsmasters-color-palette", s),
        jQuery(".cmsmasters-palette-apply-no-active .cmsmasters-color-palettes .wp-picker-default").trigger("click"),
        this.elements.$html.removeAttr("style")
    }
    clickPreviewApply(e) {
        const t = jQuery(e.currentTarget);
        t.hasClass("cmsmasters-palettes-preview__reset") && (e.stopPropagation(),
        this.elements.$previewPalettes.removeClass("cmsmasters-color-palettes-open"),
        this.elements.$previewDemo.removeClass("cmsmasters-palette-apply-active").addClass("cmsmasters-palette-apply-no-active"),
        jQuery(".cmsmasters-color-palettes .wp-picker-default").trigger("click"),
        t.removeClass("cmsmasters-palettes-preview__reset").text("Apply"),
        this.elements.$html.attr("data-cmsmasters-color-palette", "cmsmasters-default").removeAttr("style"))
    }
    initPalettesColors(e, t) {
        const s = jQuery(t)
          , a = s.data("kitId")
          , r = this.elements.$html;
        s.wpColorPicker({
            width: 308,
            defaultColor: s.attr("value"),
            change: function(e, t) {
                r.css("--e-global-color-" + a, t.color.toString())
            }
        }),
        jQuery(document).on("click", function(e) {
            const t = jQuery(".cmsmasters-color-palettes .wp-picker-container");
            t.is(e.target) || 0 !== t.has(e.target).length || this.elements.$previewPalettes.removeClass("cmsmasters-color-palettes-open")
        }
        .bind(this)),
        jQuery(".cmsmasters-color-palettes .wp-picker-container .wp-color-result").on("click", function() {
            this.elements.$previewPalettes.removeClass("cmsmasters-color-palettes-open"),
            jQuery(".wp-picker-container.wp-picker-active").closest(".cmsmasters-color-palettes").addClass("cmsmasters-color-palettes-open")
        }
        .bind(this)),
        jQuery(".cmsmasters-palettes-preview__demo .wp-picker-container").hover((function() {
            const e = jQuery(this).find(".cmsmasters-palette-color").attr("id");
            jQuery('label[for="' + e + '"]').addClass("cmsmasters-palette-alt-active");
            const t = jQuery('label[for="' + e + '"]').html();
            jQuery(this).find(".button.wp-color-result").html('<span class="cmsmasters-palette-alt-button">' + t + "</span>")
        }
        ), (function() {
            jQuery('label[for*="cmsmasters-button-"]').removeClass("cmsmasters-palette-alt-active")
        }
        ))
    }
}
new cmsmastersDemosPreview;
