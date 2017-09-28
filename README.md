# Lern-Tool Technische Darstellungslehre

Das Lern-Tool befasst sich mit dem Lesen von technischen Zeichnungen und dem räumlichen Vorstellen von Objektzeichnungen in 3-Tafelprojektion. Es bietet Übungen, in denen aus einer Menge von Darstellungen jeweils die zueinander passenden auszuwählen sind. Die Übungen sind in 3 Schwierigkeitsgrade unterteilt:

1. Stufe: Objekte mit senkrechten Kanten
2. Stufe: Objekte mit schrägen Kanten
3. Stufe: Objekte mit runden Kanten 

## Das Tool
Auf jeder Stufe werden die drei Hauptansichten (Frontansicht, Seitenansicht von links, Draufsicht) von mehreren Objekten in zufälliger Reihenfolge nebeneinander gezeigt. Mit der Maus können Ansichten angeklickt werden. Die in einem Ansichten-Bereich zuletzt angeklickte Darstellung wird ausgewählt. Wenn in allen drei Ansichten-Bereichen jeweils eine Darstellung ausgewählt wurde, entscheidet das Tool, ob die Darstellungen zueinander passen, d.h. ein und dasselbe Objekt zeigen. Passen die drei Darstellungen nicht zueinander, gibt es eine kurze visuelle Rückmeldung.

Korrekt ausgewählte Darstellungen werden dauerhaft als richtig gekennzeichnet und sind nicht mehr anwählbar.

## Modelle
Zur Darstellung der Ansichten werden SVG-Dateien verwendet. Pro Modell wird eine SVG-Datei verwendet, in der die drei Hauptansichten in getrennten Gruppierungen konstruiert wurden und als separate Targets angesprochen werden können. Alle drei Ansichten benutzen den gleichen Viewport und würden sich bei einer gemeinsamen Darstellung daher überlagern. Die einzelnen Ansichten können mittels Target-Angabe wie folgt erreicht un z.B. in HTML-Seiten eingebunden werden:

- Frontansicht eines in der Datei 01.svg gespeicherten Modells:			01.svg#V	[Live-Demo](http://htmlpreview.github.io/?https://github.com/koelibri/TDL-Tool/blob/master/model/set1/01.svg#V)
- Linke Seitansicht eines in der Datei 01.svg gespeicherten Modells:	01.svg#L	Live-Demo](http://htmlpreview.github.io/?https://github.com/koelibri/TDL-Tool/blob/master/model/set1/01.svg#L)
- Draufsicht eines in der Datei 01.svg gespeicherten Modells:			01.svg#D	Live-Demo](http://htmlpreview.github.io/?https://github.com/koelibri/TDL-Tool/blob/master/model/set1/01.svg#D)

