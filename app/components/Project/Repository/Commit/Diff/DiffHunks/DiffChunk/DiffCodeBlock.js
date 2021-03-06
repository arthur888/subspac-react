import React from 'react';
import PropTypes from 'prop-types';
import xcode from 'react-syntax-highlighter/dist/styles/xcode';
import { CodeBlock } from './styles';

const lineHeight = 20
const styleHeight = seqLength =>
  lineHeight + (seqLength ? seqLength * lineHeight : 0)

const getLineStyle = (addDel, bgColor, nullSeq) => lineNumber => ({
  display: 'block',
  width: '100%',
  height: styleHeight(nullSeq[lineNumber]),
  ...(addDel.includes(lineNumber) && {
    backgroundColor: bgColor,
  }),
})

const getLineNumberStyle = (nullSeq, start) => oriLineNumber => ({
  display: 'block',
  height: styleHeight(nullSeq[(oriLineNumber - start) + 1]),
})

const DiffCodeBlock = ({ content, start, addDel, bgColor, nullSeq }) =>
  (<CodeBlock
    style={xcode}
    showLineNumbers
    wrapLines
    startingLineNumber={start}
    lineStyle={getLineStyle(addDel, bgColor, nullSeq)}
    lineNumberStyle={getLineNumberStyle(nullSeq, start)}
    customStyle={{
      border: 0,
      margin: 0,
      padding: 0,
      borderRadius: 0,
    }}
  >
    {content || ''}
  </CodeBlock>)

DiffCodeBlock.propTypes = {
  content: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  addDel: PropTypes.array.isRequired,
  bgColor: PropTypes.string.isRequired,
  nullSeq: PropTypes.object.isRequired,
}

export default DiffCodeBlock
