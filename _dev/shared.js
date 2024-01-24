// Current hljs version used by Discourse is 10.6.0
// Reference: https://github.com/highlightjs/highlight.js/tree/eb122d3b7f88e3471e871866d73e2a99aafb20e1/docs

// Edit this language definition function and test by opening test-syntax-highlight.html in your browser.
// Once done, copy this function over to common/head_tag.html

function zig_language_definition() {
  const LITERALS = {
    className: "literal",
    match: "(true|false|null|undefined)",
  };

  const KEYWORDS =
    "pub align allowzero and asm async await break catch comptime|10 const continue defer " +
    "else enum errdefer export extern false fn for if inline noalias null or orelse packed promise " +
    "resume return linksection struct suspend nosuspend noinline callconv switch test threadlocal true try " +
    "undefined union unreachable usingnamespace var volatile while error";

  const TYPES = {
    className: "type",
    variants: [
      {
        // Numeric Types
        match:
          "\\b(f16|f32|f64|f128|u\\d+|i\\d+|isize|usize|comptime_int|comptime_float)\\b",
        relevance: 2,
      },
      {
        // C Types
        match:
          "\\b(c_short|c_ushort|c_int|c_uint|c_long|c_ulong|c_longlong|c_ulonglong|c_longdouble|c_void)\\b",
        relevance: 1,
      },
      {
        // Other Types
        match: "\\b(bool|void|noreturn|type|anyerror|anyframe|anytype)\\b",
        relevance: 0,
      },
    ],
  };

  const BUILT_IN = {
    className: "built_in",
    match: "@[_a-zA-Z][_a-zA-Z0-9]*",
  };

  const BUILT_IN_TEST = {
    begin: "@import\\(",
    relevance: 10,
  };

  const COMMENTTAGS = {
    className: "title",
    match: "\\b(TODO|FIXME|XXX|NOTE)\\b:?",
    relevance: 0,
  };

  const COMMENTS = {
    className: "comment",
    variants: [
      {
        // Documentation
        begin: "//[!/](?=[^/])",
        end: "$",
      },
      {
        // Double Slash
        begin: "//",
        end: "$",
      },
    ],
    relevance: 0,
    contains: [COMMENTTAGS],
  };

  const STRINGCONTENT = {
    variants: [
      {
        // escape
        className: "string-escape",
        match: "\\\\([nrt'\"\\\\]|(x[0-9a-fA-F]{2})|(u\\{[0-9a-fA-F]+\\}))",
      },
      {
        // invalid string escape
        className: "string-escape-invalid",
        match: "\\\\.",
      },
    ],
    relevance: 0,
  };
  const STRINGS = {
    className: "string",
    variants: [
      {
        // Double Quotes
        begin: '"',
        end: '"',
      },
      {
        // Single Quotes
        begin: "\\'",
        end: "\\'",
      },
      {
        // Multi-line
        begin: "\\\\\\\\",
        end: "$",
      },
    ],
    contains: [STRINGCONTENT],
    relevance: 0,
  };

  const OPERATORS = {
    className: "operator",
    variants: [
      {
        // C Pointer
        match: "\\[*c\\]",
      },
      {
        // Comparison
        match: "(==|!=)",
      },
      {
        // Arithmetic
        match: "(-%?|\\+%?|\\*%?|/|%)=?",
      },
      {
        // Bitwise
        match: "(<<%?|>>|!|&|\\^|\\|)=?",
      },
      {
        // Special
        match: "(==|\\+\\+|\\*\\*|->)",
      },
    ],
    relevance: 0,
  };

  const FUNCTION = {
    className: "function",
    variants: [
      {
        beginKeywords: "fn",
        end: "([_a-zA-Z][_a-zA-Z0-9]*)",
        excludeBegin: true,
      },
    ],
    relevance: 0,
  };

  const NUMBERS = {
    className: "numbers",
    variants: [
      {
        // Float
        match: "\\b[0-9][0-9_]*(\\.[0-9][0-9_]*)?([eE][+-]?[0-9_]+)?\\b",
      },
      {
        // Decimal
        match: "\\b[0-9][0-9_]*\\b",
      },
      {
        // Hexadecimal
        match: "\\b0x[a-fA-F0-9_]+\\b",
      },
      {
        // Octal
        match: "\\b0o[0-7_]+\\b",
      },
      {
        // Binary
        match: "\\b0b[01_]+\\b",
      },
    ],
    relevance: 0,
  };

  const ZIG_DEFAULT_CONTAINS = [
    LITERALS,
    STRINGS,
    COMMENTS,
    TYPES,
    FUNCTION,
    BUILT_IN,
    BUILT_IN_TEST,
    OPERATORS,
    NUMBERS,
  ];

  return {
    name: "Zig",
    aliases: ["zig"],
    keywords: KEYWORDS,
    contains: ZIG_DEFAULT_CONTAINS,
  };
}
