'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui'

export function FeedbackWidget() {
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (rating === 0) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || null,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card variant="elevated" className="border border-green-200 bg-linear-to-br from-green-50 to-white">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-stone-900 mb-1">Merci pour votre avis !</h3>
          <p className="text-sm text-stone-600">
            Vos retours nous aident à améliorer le simulateur.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card variant="elevated" className="border border-orange-100">
      <CardContent className="p-0 sm:p-0">
        <div className="text-center mb-5">
          <h3 className="text-lg font-semibold text-stone-900 mb-1">
            Votre avis nous intéresse !
          </h3>
          <p className="text-sm text-stone-600">
            Comment évaluez-vous votre expérience avec notre simulateur ?
          </p>
        </div>

        {/* Étoiles */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
            >
              <svg
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-stone-300 fill-stone-300'
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Texte de la note */}
        {rating > 0 && (
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-stone-700">
              {rating === 1 && 'Pas satisfait'}
              {rating === 2 && 'Peu satisfait'}
              {rating === 3 && 'Correct'}
              {rating === 4 && 'Satisfait'}
              {rating === 5 && 'Très satisfait !'}
            </span>
          </div>
        )}

        {/* Commentaire optionnel */}
        {rating > 0 && (
          <div className="mb-5">
            <label htmlFor="feedback-comment" className="block text-sm font-medium text-stone-700 mb-1.5">
              Un commentaire ? <span className="text-stone-400 font-normal">(optionnel)</span>
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ce que vous avez aimé, ce qui pourrait être amélioré..."
              rows={3}
              maxLength={1000}
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-stone-400 mt-1 text-right">{comment.length}/1000</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Bouton d'envoi */}
        {rating > 0 && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center px-6 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                'Envoyer'
              )}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
