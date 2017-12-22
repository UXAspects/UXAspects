<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/testsuites/testsuite">
    <p></p><p><b>&lt;testsuite name="<xsl:value-of select="@name"/>" tests="<xsl:value-of select="@tests"/>" errors="<xsl:value-of select="@errors"/>" skipped="<xsl:value-of select="@skipped"/>" disabled="<xsl:value-of select="@disabled"/>" failures="<xsl:value-of select="@failures"/>"&gt;</b></p>
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="/testsuites/testsuite/testcase">
      &lt;testcase classname="<xsl:value-of select="@classname"/>" name="<xsl:value-of select="@name"/>"&gt;
      <br /><xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="/testsuites/testsuite/testcase/failure">
        <p></p><p>&lt;failure type="<xsl:value-of select="@type"/>" message="<xsl:value-of select="@message"/>"&gt;</p>
        <xsl:apply-templates/>
  </xsl:template>
</xsl:stylesheet>
